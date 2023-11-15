import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client";
import {FindIdByAccessToken} from "../../utils/jwt.utils";
import {FindUuidById} from "../../utils/user.utils";
import {GetCoin, SubtractCoin} from "../../soap/service/coin.soap.service";
import {AddExp} from "../../soap/service/level.soap.service";
import {RedisConf} from "../../handler/conf/redis.conf";

export async function CreateRedeem(req: Request, res: Response){
    const prisma = new PrismaClient()

    if (req.body == null)
        return res.status(400).send({status: "Request body didn't exists"})

    const {name, from, coin} = req.body
    if (!(name && from && coin))
        return res.status(400).send({status: "You didn't fill request body"})

    try {
        await prisma.redeem.create({
            data:{
                name:name,
                from:from,
                coin:parseInt(coin)
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function UpdateRedeem(req: Request, res: Response){
    const prisma = new PrismaClient()

    if (req.body == null)
        return res.status(400).send({status: "Request body didn't exists"})

    const {id, name, from, coin} = req.body
    if (!(name && from && coin && id))
        return res.status(400).send({status: "You didn't fill request body"})

    try {
        await prisma.redeem.update({
            where:{
                id:id
            },
            data:{
                name: name,
                from: from,
                coin: coin
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function DeleteRedeem(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    try {
        await prisma.redeem.delete({
            where:{
                id:id
            }
        })
    }catch (e){
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function FindAllRedeem(req: Request, res: Response){
    const prisma = new PrismaClient()
    const redis = RedisConf()
    await redis.connect()
    let data: object = []

    try{
        const _temp = await redis.get("redeem")
        data = JSON.parse(_temp)
    }catch (e) {
        console.log('redeem not found in redis')
    }

    if (!(data==null))
        return res.status(200).send({
            data: data,
            status: "ok"
        })

    try{
        data = await prisma.redeem.findMany({})
        await redis.set('redeem', JSON.stringify(data))
        await redis.expire('redeem', 24*60*60)

        if (!data)
            return res.status(400).send({
                data: null,
                status: "Failed to get all data"
            })
    }catch (e) {
        return res.status(500).send({
            data: null,
            status: "Internal server error"
        })
    }

    return res.status(200).send({
        data: data,
        status: "ok"
    })
}

export async function AddRedeem(req: Request, res: Response){
    const prisma = new PrismaClient()
    const idUser = await FindIdByAccessToken(req, res)
    if (idUser == null)
        return res.status(401).send({status:"token invalid"})

    if (req.body == null)
        return res.status(400).send({status: "Request body didn't exists"})

    const {redeem_id} = req.body
    if (!redeem_id)
        return res.status(400).send({status: "You didn't fill request body"})

    try {
        const isRedeemExists = await prisma.redeem.findFirst({
            where:{
                id:redeem_id
            }
        })
        if (!isRedeemExists)
            return res.status(400).send({status:"Id redeem didn't exists"})

        const uuid = await FindUuidById(idUser)
        if (uuid == null)
            return res.status(400).send({status:"Id didn't exists"})

        const coinUser = await GetCoin(uuid)
        if (coinUser == null)
            return res.status(400).send({status:"Uuid didn't exists"})

        if (isRedeemExists.coin>parseInt(coinUser))
            return res.status(400).send({status:"Transaction failed: coin not enough"})

        const isSubtractSuccess = await SubtractCoin(uuid, isRedeemExists.coin)
        if (!isSubtractSuccess)
            return res.status(400).send({status:"Transaction failed: coin failed to subtract"})

        const addExp = await AddExp(uuid,100)
        if (!addExp)
            return res.status(400).send({status:"Exp failed to add"})

        await prisma.userRedeem.create({
            data:{
                redeem_id:redeem_id,
                user_id:idUser
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}
