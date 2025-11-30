import z from "zod";

declare global {
  namespace Express {
    export interface Request {
      role?: "Admin" | "User";
      userId?: string;
    }
  }
}

const SignUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  type: z.enum(["user", "admin"]),
});

const SignInSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const UpdateMetadataSchema = z.object({
  avatarId: z.string(),
});

const CreateSpaceSchema = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.string(),
});

export const DeleteElementSchema = z.object({
  id: z.string(),
});

const AddElementSchema = z.object({
  spaceId: z.string(),
  elementId: z.string(),
  x: z.number(),
  y: z.number(),
});

const CreateElementSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});

const UpdateElementSchema = z.object({
  imageUrl: z.string(),
});

const CreateAvatarSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
});

const CreateMapSchema = z.object({
  name: z.string(),
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});

export {
  SignUpSchema,
  SignInSchema,
  UpdateMetadataSchema,
  CreateSpaceSchema,
  AddElementSchema,
  CreateElementSchema,
  UpdateElementSchema,
  CreateAvatarSchema,
  CreateMapSchema,
};
