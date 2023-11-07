import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client";
import FindIdByAccessToken from "../../utils/jwt.utils";

export async function CreateLike(req:Request, res:Response){
    const prisma = new PrismaClient()
    const idUser = await FindIdByAccessToken(req,res)
    if (idUser == null)
        return res.status(401).send({status:"invalid token"})

    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const {id} = req.body
    if (!id)
        return res.status(400).send({status:"id didnt exist"})

    try {
        await prisma.like.create({
            data:{
                id:id,
                id_user:idUser
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }
    return res.status(200).send({status:"Like Successfully Created"})
}

//TODO: make sure that delete and update is user
export async function DeleteLike(req:Request, res:Response){
    const prisma = new PrismaClient()
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const id = +req.params['id']
    if (!id)
        return res.status(400).send({status:"comment didnt exist"})

    try{
        await prisma.like.delete({
            where:{
                id:id
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }

    return res.status(200).send({status:"successfully deleted like"})
}