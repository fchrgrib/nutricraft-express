import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

export async function FindAllUser(req: Request, res: Response){
    const prisma = new PrismaClient()
    let data: object = []

    try {
        data = await prisma.user.findMany({
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
                    updated_at: true,
                    like_from_id_creator:true,
                    forum: true
            }
        })
        if (!data)
            return res.status(400).send({
                data: null,
                status: "User didn't exists"
            })
    }catch (e) {
        res.status(500).send({
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
                updated_at: true,
                like_from_id_creator:true,
                forum: true
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
                updated_at: true,
                like_from_id_creator: true,
                forum: true
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

export async function UpdateUser(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    if (req.body == null)
        return res.status(400).send({status: "Request body didn't exists"})

    const {name, email, password, title, phone_number,  description} = req.body

    if (!(
        name && email && password &&
        title && phone_number && description
    ))
        return res.status(400).send({status: "You didn't completed your request"})

    try{
        await prisma.user.update({
            where:{
                id: id
            },
            data:{
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10),
                title: title,
                phone_number: phone_number,
                description: description,
            }
        })
    }catch (e) {
        return res.status(500).send({status: "Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function DeleteUser(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    try {
        await prisma.user.delete({
            where:{
                id:id
            }
        })
    }catch (e){
        return res.status(400).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}