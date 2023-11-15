import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"
import {FindIdByAccessToken, FindUuidByAccessToken} from "../../utils/jwt.utils"
import {FindCreatorByIdContent, FindIdByUuid} from "../../utils/user.utils";
import {AddExp} from "../../soap/service/level.soap.service";
import {AddCoin} from "../../soap/service/coin.soap.service";

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
        await prisma.$disconnect()
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
        await prisma.$disconnect()
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
        await prisma.$disconnect()
    }

    return res.status(200).send({status:`successfully update content_id: ${id}`})
}

export async function FindAllContent(req:Request, res:Response) {
    const prisma = new PrismaClient()
    let data = []

    try{
        data = await prisma.content.findMany({
            include:{
                viewers: true
            }
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({
        data: data,
        status: "ok"
    })
}

export async function FindContentById(req:Request, res:Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']
    const ip = req.ip
    let data = []

    if (!ip)
        return res.status(400).send({
            data: null,
            status: "ip address didnt exist"
        })

    const uuidCreator = await FindCreatorByIdContent(id)
    if (uuidCreator == null)
        return res.status(400).send({
            data: null,
            status: "creator didnt exist"
        })


    const addExp = await AddExp(uuidCreator, 10)
    const addCoin = await AddCoin(uuidCreator, 100)

    if (!addExp || !addCoin)
        return res.status(400).send({
            data: null,
            status: "failed to add coin or exp"
        })

    try {
        data = await prisma.content.findMany({
            where:{
                id: id
            }
        })
        await prisma.viewers.create({
            data:{
                id_content: id,
                ip_address: ip
            }
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        await prisma.$disconnect()
    }

    return res.status(500).send({
        data:data,
        status:"ok"
    })
}

export async function FindContentByUuid(req:Request, res:Response){
    const prisma = new PrismaClient()
    const uuid = req.params['uuid']
    let data = []

    const id = await FindIdByUuid(uuid)
    if (id == null)
        return res.status(400).send({status:"Uuid didnt exists"})

    try {
        data = await prisma.content.findMany({
            where:{
                id_creator: id
            },
            include:{
                viewers:true
            },
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        await prisma.$disconnect()
    }

    return res.status(500).send({
        data:data,
        status:"Internal server error"
    })
}

export async function FindContentByCreator(req: Request, res: Response){
    const prisma = new PrismaClient()
    const uuid = await FindUuidByAccessToken(req, res)

    if (uuid == null)
        return res.status(401).send({
            data: null,
            status: "token invalid"
        })

    const id = await FindIdByUuid(uuid)
    let data: object = []
    if (id == null)
        return res.status(400).send({status:"Uuid didnt exists"})

    try {
        data = await prisma.content.findMany({
            where:{
                id_creator: id
            },
            include:{
                viewers:true
            },
        })
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    }finally {
        await prisma.$disconnect()
    }

    return res.status(500).send({
        data:data,
        status:"Internal server error"
    })
}


export async function FindContentByTitle(req: Request, res: Response){
    const prisma = new PrismaClient()

    if (req.body == null)
        return res.status(400).send({
            data: null,
            status: "Request body didn't exists"
        })

    const {title} = req.body
    if (!title)
        return res.status(400).send({
            data: null,
            status: "You hadn't fill the title"
        })

    let data: object = []
    try{
        const isContentExist = await prisma.content.findMany({
            where:{
                title: {
                    contains: title
                }
            },
            include:{
                viewers: true
            }
        })
        if (!isContentExist)
            return res.status(400).send({
                data: null,
                status: "Title didn't exists"
            })

        data = isContentExist
    }catch (e) {
        return res.status(500).send({
            data:null,
            status:"Internal server error"
        })
    } finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({
        data: data,
        status: 'ok'
    })
}

export async function FindContentBySubscriber(req: Request, res: Response){
    const prisma = new PrismaClient()
    let data = []

    if (req.body == null)
        return res.status(400).send({
            data: null,
            status: "Request body didn't exists"
        })

    const {subscribes, title} = req.body
    if (!(subscribes && title))
        return res.status(400).send({
            data: null,
            status: "You didn't fill anything"
        })

    try{
        for (const subscribe of subscribes) {
            const idUser = await FindIdByUuid(subscribe)
            if (idUser == null)
                continue

            const isContentExists = await prisma.content.findMany({
                where:{
                    id_creator: idUser,
                    title:{
                        contains: title
                    }
                }
            })

            if (!isContentExists)
                continue

            for (const content of isContentExists){
                data.push(content)
            }
        }
    }catch (e) {
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