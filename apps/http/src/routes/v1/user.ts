import { Router } from "express";
import { UpdateMetadataSchema } from "../../types/index.js";
import { userMiddleware } from "../../middleware/user.js";
import { prisma } from "@repo/db";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleware, async (req, res) => {
  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ message: "Validation failed" });
  }

  try {
    await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        avatarId: parsedData.data.avatarId,
      },
    });

    return res.status(200).json({
      message: "Updation Successful",
    });
  } catch (error) {
    return res.status(400).json({ message: "Updation failed" });
  }
});

userRouter.get("/metadata/bulk", async (req, res) => {
  const userIdString = (req.query.ids ?? "[]") as string;
  const userIds = userIdString.slice(1, userIdString?.length - 2).split(",");

  try {
    const metadata = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        avatar: {
          select: {
            imageUrl: true,
          },
        },
        id: true,
      },
    });

    return res.status(200).json({
      avatars: metadata.map((m: { id: string; avatar?: { imageUrl?: string | null } | null }) => ({
        userId: m.id,
        avatarId: m.avatar?.imageUrl,
      })),
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fetching failed",
    });
  }
});
