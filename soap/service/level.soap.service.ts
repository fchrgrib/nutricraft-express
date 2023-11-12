import {Request, Response} from 'express'
import * as util from "util";
import {addExp, getExp, newLevelAccount, subtractExp} from "../template/level.soap.template";
import {parseString} from "xml2js";
import {FindUuidByAccessToken} from "../../utils/jwt.utils";

const soap = require('easy-soap-request')

export async function GetExp(req: Request, res: Response){
    const uuid = await FindUuidByAccessToken(req,res)
    if (!uuid)
        return res.status(401).send({exp:null, status:"Uuid doesn't exists"})

    const xmlRequest = util.format(getExp.template, uuid)
    let exp: object = []

    try{
        const {response} = await soap({
            url: getExp.url,
            headers: getExp.header,
            xml: xmlRequest
        })

        const {body} = response
        parseString(body, async (err: any, result: any)=>{
            exp = result["S:Envelope"]["S:Body"][0]["ns2:getExpCreatorResponse"][0]["return"][0]
        })
        return res.status(200).send({exp:exp, status:"ok"})
    }catch (e) {
        return res.status(500).send({exp:null, status:"Can't connect soap service"})
    }
}

export async function AddExp(req: Request, res: Response){
    const uuid = await FindUuidByAccessToken(req,res)
    if (!uuid)
        return res.status(401).send({status:"Uuid doesn't exists"})

    const {exp} = req.body

    const xmlRequest = util.format(addExp.template, uuid, parseInt(exp))
    try{
        await soap({
            url: addExp.url,
            headers: addExp.header,
            xml: xmlRequest
        })

        return res.status(200).send({status:"ok"})
    }catch (e) {
        return res.status(500).send({status:"Can't connect soap service"})
    }
}

export async function SubtractExp(req: Request, res: Response){
    if (req.body == null)
        return res.status(400).send({status:"Request body doesn't exists"})

    const {uuid, exp} = req.body

    const xmlRequest = util.format(subtractExp.template, uuid, parseInt(exp))
    try{
        await soap({
            url: subtractExp.url,
            headers: subtractExp.header,
            xml: xmlRequest
        })

        return res.status(200).send({status:"ok"})
    }catch (e) {
        return res.status(500).send({status:"Can't connect soap service"})
    }
}

export async function NewLevelAccount(uuid: string){
    const xmlRequest = util.format(newLevelAccount.template, uuid)
    try{
        await soap({
            url: newLevelAccount.url,
            headers: newLevelAccount.header,
            xml: xmlRequest
        })

        return true
    }catch (e) {
        return false
    }
}