import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const USER_JWT_SECRET = process.env.USER_JWT_SECRET

function userAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization
        // @ts-ignore
        const verifiedToken = jwt.verify(token, USER_JWT_SECRET)
        if(verifiedToken) {
            // @ts-ignore
            req.userId = verifiedToken.id
            next()
        } 
    } catch(err) {
        res.status(403).json({
            message: "authentication unsuccessful, invalid token"
        })
    }
}
export default userAuthMiddleware