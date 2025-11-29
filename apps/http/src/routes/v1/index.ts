import { Router } from "express";
import { userRouter } from "./user.js";
import { adminRouter } from "./admin.js";
import { spaceRouter } from "./space.js";

export const router = Router()

router.post("/signup", (req, res) => {
    res.send("signup")
})

router.post("/signin", (req, res) => {
    res.send("signin")
})

router.get("/elements", (req, res) => {
    res.send("elements")
})

router.get("/avatars", (req, res) => {
    
})

router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/spave", spaceRouter)