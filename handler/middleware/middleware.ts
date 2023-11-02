import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export default async function Middleware(req: Request, res: Response, next: NextFunction){
    const prisma = new PrismaClient()
    const token = req.cookies['token']
    if (!token) return res.status(401).send({status:'token doesnt exist'})

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY || '')
        if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
            return res.status(401).send({status:'token is invalid'})

        const isUserExist = await prisma.user.findFirst({where:{uuid: decode.uuid}})
        if (!isUserExist) return res.status(401).send({status:'token is invalid'})
    }catch (e) {
        return res.status(401).send({status:'token is invalid'})
    }finally {
        prisma.$disconnect()
    }
    next()
}