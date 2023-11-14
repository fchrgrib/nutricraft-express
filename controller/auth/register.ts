import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {newCoinAccount} from "../../soap/template/coin.soap.template";
import {NewCoinAccount} from "../../soap/service/coin.soap.service";
import {NewLevelAccount} from "../../soap/service/level.soap.service";

export default async function Register(req: Request, res: Response) {
    const prisma = new PrismaClient()

    try {
        if (req.statusCode!= undefined && req.statusCode>=400){
            res.status(400).send({ status: "Request failed" })
            return
        }
        if (req.body == null) {
            return res.status(400).send({ status: "Request body is empty" })
        }
        if (!(req.body.full_name && req.body.email &&
            req.body.title && req.body.phone_number &&
            req.body.description)) {
            console.log("You haven't filled in all the required fields.")
            return res.status(400).send({ status: "Missing required fields" })
        }

        const isEmailExists = await prisma.user.findFirst({where:{email: req.body.email}})
        if (isEmailExists)
            return res.status(400).send({ status: "Email already exists" })

        const isPhoneNumberExists = await prisma.user.findFirst({where:{phone_number:req.body.phone_number}})
        if (isPhoneNumberExists)
            return res.status(400).send({ status: "Phone number already exists" })

        const uuid = randomUUID()
        const isCoinCreated = await NewCoinAccount(uuid)
        const isLevelCreated = await NewLevelAccount(uuid)

        if (!isCoinCreated)
            return res.status(400).send({ status: "Coin cannot created" })
        if (!isLevelCreated)
            return res.status(400).send({ status: "Level cannot created" })

        await prisma.user.create({
            data: {
                uuid: uuid,
                name: req.body.full_name,
                email: req.body.email,
                title: req.body.title,
                password: await bcrypt.hash(req.body.password, 10),
                phone_number: req.body.phone_number,
                description: req.body.description,
                id_file: req.body.id_file
            }
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ status: "Internal server error" })
    } finally {
        await prisma.$disconnect()
    }
    return res.status(200).send({ status: "ok" })
}
