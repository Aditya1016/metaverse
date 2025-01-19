import { Router } from "express";

export const adminRouter = Router()

adminRouter.post("/element", (req, res) => {
    res.send("users")
})

adminRouter.put("/element/:elementId", (req, res) => {
    res.send("users")
})

adminRouter.post("/avatar", (req, res) => {
    res.send("users")
})

adminRouter.post("/:map", (req, res) => {
    res.send("users")
})