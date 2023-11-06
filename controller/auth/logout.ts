import { Request, Response } from 'express';
import {RedisConf} from "../../handler/conf/redis.conf";
import jwt from "jsonwebtoken";

export default async function Logout (req:Request, res:Response) {
    const token = req.cookies['token']
    if (token==='') return res.status(401).send({status:'token doesnt exist'})

    const decode = jwt.verify(token,`${process.env.JWT_KEY}${process.env.REFRESH_KEY}`||'')
    if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
        return res.status(401).send({status:'token is invalid'})

    const redis = RedisConf()
    await redis.connect()
    await redis.del(`refresh-token-${decode.uuid}`)
    await redis.disconnect()

    res.clearCookie('token')
    res.status(200).send({status:"successfully logout"})
}