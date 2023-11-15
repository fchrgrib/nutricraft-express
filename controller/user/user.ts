import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client";

export async function FindUserById(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']
    let data: object = []

    try{
        const isUserExists = await prisma.user.findFirst({
            where:{
                id: id
            },
            select:{
                id: true,
                uuid: true,
                name: true,
                email: true,
                title: true,
                phone_number: true,
                description: true,
                id_file: true,
                created_at: true,
                updated_at: true
            }
        })

        if (!isUserExists)
            return res.status(400).send({
                data:null,
                status:"Didn't found any user"
            })

        data = isUserExists
    }catch (e){
        return res.status(500).send({
            data: null,
            status: "Internal server error"
        })
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({
        data: data,
        status: "ok"
    })
}

export async function FindUserByUuid(req: Request, res: Response){
    const prisma = new PrismaClient()
    let data: object = []

    if (req.body == null)
        return res.status(400).send({
            data:null,
            status:"Request body didn't exists"
        })

    const {uuid} = req.body
    if (!uuid)
        return res.status(400).send({
            data: null,
            status: "Uuid didn't exists"
        })

    try{
        const isUserExists = await prisma.user.findFirst({
            where:{
                uuid: uuid
            },
            select:{
                id: true,
                uuid: true,
                name: true,
                email: true,
                title: true,
                phone_number: true,
                description: true,
                id_file: true,
                created_at: true,
                updated_at: true
            }
        })

        if (!isUserExists)
            return res.status(400).send({
                data:null,
                status:"Didn't found any user"
            })

        data = isUserExists
    }catch (e){
        return res.status(500).send({
            data: null,
            status: "Internal server error"
        })
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({
        data: data,
        status: 'ok'
    })
}