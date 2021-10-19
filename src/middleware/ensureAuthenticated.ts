import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            errorCOde: "Token Invalid",
        });
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET!) as IPayload

        request.user_id = sub

        return next();
    } catch (err) {
        res.status(401).json({ errorCode: "Token expired" })
    }

}
