import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

export async function FindIdByAccessToken(req:Request, res:Response){
    const prisma = new PrismaClient()
    const token = req.cookies['token']
    if (token==='') return null

    const decode = jwt.verify(token,`${process.env.JWT_KEY}${process.env.REFRESH_KEY}`||'')
    if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
        return null

    try {
        const isUserExist = await prisma.user.findFirst({where:{uuid: decode.uuid}})
        if (!isUserExist) return null
        return isUserExist.id
    }catch (e) {
        return null
    }
}

export async function FindUuidByAccessToken(req:Request, res:Response){
    const token = req.cookies['token']
    if (token==='') return null

    const decode = jwt.verify(token,`${process.env.JWT_KEY}${process.env.REFRESH_KEY}`||'')
    if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
        return null

    return decode.uuid
}