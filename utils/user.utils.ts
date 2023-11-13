import {PrismaClient} from "@prisma/client";

export async function FindCreatorByIdContent(id: number){
    const prisma = new PrismaClient()

    try {
        const isContentExist = await prisma.content.findFirst({
            where:{
                id: id
            }
        })

        if (!isContentExist) return null

        return await FindUuidById(isContentExist.id_creator)
    }catch (e) {
        return null
    }
}

export async function FindUuidById(id: number){
    const prisma = new PrismaClient()

    try{
        const isUserExist = await prisma.user.findFirst({
            where:{
                id: id
            }
        })

        if (!isUserExist) return null

        return isUserExist.uuid
    }catch (e) {
        return null
    }
}

export async function FindIdByUuid(uuid: string){
    const prisma = new PrismaClient()

    if (uuid == '' || uuid == null)
        return null

    try{
        const isUserExist = await prisma.user.findFirst({
            where:{
                uuid: uuid
            }
        })

        if (!isUserExist) return null

        return isUserExist.id
    }catch (e) {
        return null
    }
}