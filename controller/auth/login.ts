import { Request, Response } from 'express';
import {PrismaClient} from "@prisma/client";
import comparePasswords from "../../utils/auth.utils";
import jwt from "jsonwebtoken";
import {RedisConf} from "../../conf/redis.conf";

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

        const encode = jwt.sign({uuid: isEmailExist.uuid, email: isEmailExist.email, name: isEmailExist.name},process.env.JWT_KEY || '')
        await redis.connect()
        await redis.set('token',encode)
        await redis.expire('token',24*60*60)
        await redis.disconnect()
        res.status(200).send({status:"ok"})
    }catch (e) {
        console.error(e)
        res.status(500).send("Internal Status Error")
        return
    }finally {
        prisma.$disconnect()
    }

    return
}