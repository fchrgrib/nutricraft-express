import { Request, Response } from 'express';
import {RedisConf} from "../../conf/redis.conf";

export default async function Logout (req:Request, res:Response) {
    const redis = RedisConf()
    await redis.connect()
    await redis.del('token')
    await redis.disconnect()
    res.status(200).send({status:"successfully logout"})
}