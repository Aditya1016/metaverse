import { Router } from "express";
import { userRouter } from "./user.js";
import { adminRouter } from "./admin.js";
import { spaceRouter } from "./space.js";
import { SignInSchema, SignUpSchema } from "../../types/index.js";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const router = Router();

router.post("/signup", async (req, res) => {
  const parsedData = SignUpSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed" });
  }

  const { username, password, type } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: type === "admin" ? "Admin" : "User",
      },
    });
    return res.status(200).json({
      userId: user.id,
      message: "Signup Success",
    });
  } catch (error) {
    return res.status(400).json({ message: "User already exists" });
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(403).json({ message: "Validation failed" });
  }

  const { username, password } = parsedData.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "SignIn failed",
    });
  }
});

router.get("/elements", async (req, res) => {
  try {
    const elements = await prisma.element.findMany();

    return res.status(200).json({
      elements: elements.map(
        (e: {
          id: string;
          imageUrl: string;
          width: Number;
          height: Number;
          static: Boolean;
        }) => ({
          id: e.id,
          imageUrl: e.imageUrl,
          width: e.width,
          height: e.height,
          static: e.static,
        })
      ),
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't find",
    });
  }
});

router.get("/avatars", async (req, res) => {
  try {
    const avatars = await prisma.avatar.findMany();
    return res.status(200).json({
      avatars: avatars.map(
        (x: { id: string; imageUrl: string; name: string }) => ({
          id: x.id,
          imageUrl: x.imageUrl,
          name: x.name,
        })
      ),
    });
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't find avatars",
    });
  }
});

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/space", spaceRouter);