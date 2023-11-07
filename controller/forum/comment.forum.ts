import {Request, Response} from "express"
import FindIdByAccessToken from "../../utils/jwt.utils";
import {PrismaClient} from "@prisma/client";
import exp from "constants";

export async function CreateComment(req:Request, res:Response){
    const prisma = new PrismaClient()
    const idUser = await FindIdByAccessToken(req,res)
    if (idUser == null)
        return res.status(401).send({status:"invalid token"})

    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const {comment, id} = req.body

    if (!(comment && id))
        return res.status(400).send({status:"comment didnt exist"})

    try{
        await prisma.comment.create({
            data:{
                id:id,
                id_user:idUser,
                comment:comment
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }
    return res.status(200).send({status:"comment successfully created"})
}

export async function UpdateComment(req:Request, res:Response){
    const prisma = new PrismaClient()
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const id = +req.params['id']
    const {comment} = req.body
    if (!(id && comment))
        return res.status(400).send({status:"comment didnt exist"})

    try{
        await prisma.comment.update({
            where:{
                id:id
            },
            data:{
                comment:comment
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }

    return res.status(200).send({status:"successfully updated comment"})
}

//TODO: make sure that delete and update is user
export async function DeleteComment(req:Request, res:Response){
    const prisma = new PrismaClient()
    if (req.body == null)
        return res.status(400).send({status:"Request body didnt exists"})

    const id = +req.params['id']
    if (!id)
        return res.status(400).send({status:"comment didnt exist"})

    try{
        await prisma.comment.delete({
            where:{
                id:id
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        prisma.$disconnect()
    }

    return res.status(200).send({status:"successfully deleted comment"})

}