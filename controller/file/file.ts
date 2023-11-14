import {Request, Response} from 'express'
import {PrismaClient} from "@prisma/client";
import * as _path from "path";
import * as fs from "fs";
import path from "path";

export async function CreateFile(req:Request, res:Response){
    const prisma = new PrismaClient()

    if (req.file == null)
        return res.status(400).send({status:"Request body didn't exists"})

    const {originalname, size, mimetype,path,filename} = req.file

    try {
        await prisma.file.create({
            data:{
                name:originalname,
                type:mimetype.split("/")[1],
                size: size,
                url: `http://nutricraft-express/image?filename=${filename}`,
                path: _path.join(__dirname, `../../../${path}`)
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function DeleteFile(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    try {
        const isFileExists = await prisma.file.findFirst({
            where:{
                id:id
            }
        })

        if (!isFileExists)
            return res.status(400).send({status:"File doesn't exists"})

        fs.unlink(isFileExists.path, (err: any)=>{
            if (err)
                return res.status(500).send({status:"Internal server error"})
        })

        await prisma.file.delete({
            where:{
                id: id
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function UpdateFile(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    if (req.file == null)
        return res.status(400).send({status:"Request body didn't exists"})

    const {originalname, size, mimetype,path,filename} = req.file

    try {
        const isFileExists = await prisma.file.findFirst({
            where:{
                id:id
            }
        })

        if (!isFileExists)
            return res.status(400).send({status:"File doesn't exists"})

        fs.unlink(isFileExists.path, (err: any)=>{
            if (err)
                return res.status(500).send({status:"Internal server error"})
        })

        await prisma.file.update({
            where:{
                id:id
            },
            data:{
                name:originalname,
                type:mimetype.split("/")[1],
                size: size,
                url: `http://nutricraft-express/image?filename=${filename}`,
                path: _path.join(__dirname, `../../../${path}`)
            }
        })
    }catch (e) {
        return res.status(500).send({status:"Internal server error"})
    }finally {
        await prisma.$disconnect()
    }

    return res.status(200).send({status:"ok"})
}

export async function FindFileById(req: Request, res: Response){
    const prisma = new PrismaClient()
    const id = +req.params['id']

    try {
        const data = await prisma.file.findFirst({
            where:{
                id: id
            }
        })

        return res.status(200).send({
            data: data,
            status:"ok"
        })
    }catch (e) {
        return res.status(500).send({data:null,status:"Internal server error"})
    }
}

export async function StaticFile(req: Request, res: Response){
    const filename = req.query['filename']
    res.sendFile(path.join(__dirname,`../../../storage/assets/${filename}`))
}