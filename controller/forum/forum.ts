import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client";

export async function CreateForum(req:Request, res:Response) {
    const prisma = new PrismaClient()
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const {title, body, id_file} = req.body
    if (!(title && body && id_file))
        return res.status(400).send({status: "you're not fill all the section"})

    try {
        await prisma.forum.create({
            data:{
                title: title,
                body: body,
                id_file: id_file
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"successfully created forum"})
}

export async function UpdateForum(req:Request, res:Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const {title, body, id_file} = req.body
    if (!(title && body && id_file))
        return res.status(400).send({status: "you're not fill all the section"})

    try {
        await prisma.forum.update({
            where:{
                id:id
            },
            data:{
                title: title,
                body: body,
                id_file: id_file
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"successfully updated forum"})
}

export async function DeleteForum(req:Request, res:Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    try {
        await prisma.forum.delete({
            where:{
                id:id
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"successfully deleted forum"})
}

export async function FindAllForum(req:Request, res:Response){
    const prisma = new PrismaClient()
    let data = []

    try {
        data = await prisma.forum.findMany({
            select:{},
            orderBy:{
                created_at:'asc'
            }
        })
    }catch (e) {
        return res.status(500).send({data:null,status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }
    return res.status(200).send({data:data, status:"ok"})
}

export async function FindForumById(req:Request, res:Response){
    const prisma = new PrismaClient()
    let data = {}
    const id = +req.params['id']

    try {
        const _temp = await prisma.forum.findFirst({
            where:{
                id:id
            },
            select:{},
            orderBy:{
                created_at:'asc'
            }
        })
        if (_temp==null)
            return res.status(400).send({data:null, status:"not find any data"})
        data = _temp
    }catch (e) {
        return res.status(500).send({data:null,status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }
    return res.status(200).send({data:data, status:"ok"})
}