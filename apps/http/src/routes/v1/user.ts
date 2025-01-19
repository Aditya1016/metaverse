import { Router } from "express";

export const userRouter = Router()

userRouter.post("/metadata", (req, res) => {
    res.send("metadata")
})

userRouter.get("/metadata/bulk", (req, res) => {
    
})