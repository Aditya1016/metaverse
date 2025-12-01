import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const adminMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string, userId: string }
        if(decoded.role !== 'Admin'){
            return res.status(403).json({message: "Unauthorized"})
        }

        req.userId = decoded.userId
        next();
    } catch (e) {
        return res.status(403).json({message: "Invalid token"})
    }
}