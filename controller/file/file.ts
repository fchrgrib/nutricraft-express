import {Request, Response} from 'express'
import {PrismaClient} from "@prisma/client";

export async function CreateFile(req:Request, res:Response){
    const prisma = new PrismaClient()

}