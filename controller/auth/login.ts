import { Request, Response } from 'express';
import {PrismaClient} from "@prisma/client";
import comparePasswords from "../../utils/auth.utils";
import jwt from "jsonwebtoken";
import {RedisConf} from "../../handler/conf/redis.conf";

export default async function Login (req:Request,res:Response){
    const prisma = new PrismaClient()
    const redis = RedisConf()


    if (req.body == null){
        res.status(400).send({status:"your not fill anything"})
        return
    }

    const {email, password} = req.body
    if (!(email&&password)){
        res.status(400).send({status:"your not fill anything"})
        return
    }

    try{
        const isEmailExist = await prisma.user.findFirst({where:{email: email}})
        if (!isEmailExist){
            res.status(400).send({status:"email doesnt exist"})
            return
        }
        const isPasswordMatch = await comparePasswords(password, isEmailExist.password)
        if (!isPasswordMatch){
            res.status(400).send({status:"password is wrong"})
            return
        }

        const encode = jwt.sign({uuid: isEmailExist.uuid, email: isEmailExist.email, name: isEmailExist.name},`${process.env.JWT_KEY}${process.env.REFRESH_KEY}` || '')
        const encodeRefresh = jwt.sign({uuid: isEmailExist.uuid}, `${process.env.REFRESH_KEY}${process.env.JWT_KEY}`||'')
        res.cookie('token',encode,{
            maxAge:24*60*60*1000,
            secure: true,
            httpOnly: false,
            path: '/',
            domain:'localhost'
        })

        await redis.connect()
        await redis.set(`refresh-token-${isEmailExist.uuid}`, encodeRefresh)
        await redis.expire(`refresh-token-${isEmailExist.uuid}`, 12*30*24*60*60)
        res.status(200).send({status:"ok"})
    }catch (e) {
        console.error(e)
        res.status(500).send("Internal Status Error")
        return
    }finally {
        prisma.$disconnect()
        await redis.disconnect()
    }

    return
}