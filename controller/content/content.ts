import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
import FindIdByAccessToken from "../../utils/jwt.utils";

//TODO: Create Find Content By Creator Subscribed

export async function CreateContent(req: Request, res: Response){
    const prisma = new PrismaClient()

    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})
    const {title, highlight, body, id_photo} = req.body

    if (!(title&&highlight&&body&&id_photo))
        return res.status(400).send({status: "you're not fill all the section"})

    const idUser = await FindIdByAccessToken(req,res)
    if (!idUser)
        return res.status(401).send({status:"token invalid"})

    try {
        await prisma.content.create({
            data:{
                title: title,
                highlight: highlight,
                body: body,
                id_creator:idUser,
                id_photo: id_photo
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal Server Error"})
    }finally {
        prisma.$disconnect()
    }
    return res.status(200).send({status:"successfully created content"})
}

export async function DeleteContent(req:Request, res:Response){
    const prisma = new PrismaClient()
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const {id} = req.body

    if (!id)
        return res.status(400).send({status:"Id didnt exists"})

    try {
        await prisma.content.delete({where:{id:id}})
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }
    return res.status(200).send({status:`content ${id} successfully deleted`})
}

export async function UpdateContent(req:Request, res:Response) {
    const prisma = new PrismaClient()
    const id = +req.params['id']
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})
    const {title, highlight, body, id_photo, id_creator} = req.body

    if (!(id && title && highlight && body && id_photo))
        return res.status(400).send({status: "you're not fill all the section"})

    try {
        await prisma.content.update({
            where:{
                id:id
            },
            data:{
                title: title,
                highlight: highlight,
                body: body,
                id_photo: id_photo,
                id_creator: id_creator
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }
    return res.status(200).send({status:`successfully update content_id: ${id}`})
}

export async function FindAllContent(req:Request, res:Response) {
    const prisma = new PrismaClient()
    let data = []
    try{
        data = await prisma.content.findMany({
            select:{}
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        prisma.$disconnect()
    }
    return res.status(200).send({
        data: data,
        status: "ok"
    })
}

export async function FindContentById(req:Request, res:Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']
    let data = []

    try {
        data = await prisma.content.findMany({
            where:{
                id: id
            },
            select:{}
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        prisma.$disconnect()
    }
    return res.status(500).send({
        data:data,
        status:"Internal server error"
    })
}

export async function FindContentByCreator(req:Request, res:Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']
    let data = []
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    try {
        data = await prisma.content.findMany({
            where:{
                id_creator: id
            },
            select:{}
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        prisma.$disconnect()
    }
    return res.status(500).send({
        data:data,
        status:"Internal server error"
    })
}

