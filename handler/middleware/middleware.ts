import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {RedisConf} from "../conf/redis.conf";

export default async function Middleware(req: Request, res: Response, next: NextFunction){
    const token = req.cookies['token']
    if (!token) return res.status(401).send({status:'token doesnt exist'})

    const decode = jwt.verify(token,`${process.env.JWT_KEY}${process.env.REFRESH_KEY}`||'')
    if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
        return res.status(401).send({status:'token is invalid'})


    const prisma = new PrismaClient()
    const redis = RedisConf()
    await redis.connect()
    let refreshToken = ''


    try {
        refreshToken = await redis.get(`refresh-token-${decode.uuid}`)
        if (!refreshToken)
            return res.status(401).send({status:'refreshToken doesnt exist'})
    }catch (e) {
        return res.status(401).send({status:'refreshToken doesnt exist'})
    }

    if (refreshToken==='')
        return res.status(401).send({status:'refreshToken doesnt exist'})

    try {
        const decodeRefresh = jwt.verify(refreshToken, `${process.env.REFRESH_KEY}${process.env.JWT_KEY}` || '')
        if (!(typeof decodeRefresh === 'object' && 'uuid' in decodeRefresh && typeof decodeRefresh.uuid === 'string'))
            return res.status(401).send({status:'refreshToken is invalid'})

        const isUserExist = await prisma.user.findFirst({where:{uuid: decodeRefresh.uuid}})
        if (!isUserExist) return res.status(401).send({status:'refreshToken is invalid'})
        res.cookie('token',jwt.sign(decode,`${process.env.JWT_KEY}${process.env.REFRESH_KEY}`||''),{maxAge:24*60*60})
    }catch (e) {
        return res.status(401).send({status:'refreshToken is invalid'})
    }finally {
        prisma.$disconnect()
        await redis.disconnect()
    }
    next()
}