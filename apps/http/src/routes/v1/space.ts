import { Router } from "express";

export const spaceRouter = Router()

spaceRouter.post("/", (req, res) => {
    res.send("users")
})

spaceRouter.delete("/:spaceId", (req, res) => {
    res.send("users")
})

spaceRouter.get("/all", (req, res) => {
    res.send("users")
})

spaceRouter.post("/element", (req, res) => {
    res.send("users")
})

spaceRouter.delete("/element", (req, res) => {
    
})

spaceRouter.get("/:spaceId", (req, res) => {
    res.send("users")
})