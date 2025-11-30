import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin.js";
import {
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
} from "../../types/index.js";
import { prisma } from "@repo/db";
export const adminRouter = Router();
adminRouter.use(adminMiddleware);

adminRouter.post("/element", async (req, res) => {
  const parsedData = CreateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed" });
  }
  try {
    const element = await prisma.element.create({
      data: {
        width: parsedData.data.width,
        height: parsedData.data.height,
        static: parsedData.data.static,
        imageUrl: parsedData.data.imageUrl,
      },
    });

    return res.status(200).json({
      id: element.id,
    });
  } catch (error) {
    return res.status(400).json({
        message: "Creation failed"
    })
  }
});

adminRouter.put("/element/:elementId", async (req, res) => {
  const parsedData = UpdateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed" });
  }
  try {
    await prisma.element.update({
      where: {
        id: req.params.elementId,
      },
      data: {
        imageUrl: parsedData.data.imageUrl,
      },
    });
    return res.status(200).json({ message: "Element updated" });
  } catch (error) {
    return res.status(400).json({
      message: "Updation failed",
    });
  }
});

adminRouter.post("/avatar", async (req, res) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed" });
  }
  try {
    const avatar = await prisma.avatar.create({
      data: {
        name: parsedData.data.name,
        imageUrl: parsedData.data.imageUrl,
      },
    });
    return res.status(200).json({ avatarId: avatar.id });
  } catch (error) {
    return res.status(400).json({
      message: "Creation failed",
    });
  }
});

adminRouter.post("/map", async (req, res) => {
  const parsedData = CreateMapSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed" });
  }
  try {
    const map = await prisma.map.create({
      data: {
        name: parsedData.data.name,
        width: parseInt(parsedData.data.dimensions.split("x")[0]),
        height: parseInt(parsedData.data.dimensions.split("x")[1]),
        thumbnail: parsedData.data.thumbnail,
        mapElements: {
          create: parsedData.data.defaultElements.map(
            (e: { elementId: string; x: Number; y: Number }) => ({
              elementId: e.elementId,
              x: e.x,
              y: e.y,
            })
          ),
        },
      },
    });

    return res.status(200).json({
      id: map.id,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Creation failed",
    });
  }
});