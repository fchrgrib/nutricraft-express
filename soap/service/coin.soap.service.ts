import {Request, Response} from 'express'
import * as util from "util"
import {parseString} from "xml2js";
import {addCoin, getCoin, newCoinAccount, subtractCoin} from "../template/coin.soap.template";
import {FindUuidByAccessToken} from "../../utils/jwt.utils";

const soap = require('easy-soap-request')

export async function GetCoin(req:Request, res:Response){
    const uuid = await FindUuidByAccessToken(req,res)
    if (!uuid)
        return res.status(401).send({coin:[], status:"Uuid doesn't exists"})

    let coin = ''
    const xmlRequest = util.format(getCoin.template, uuid)

    try{
        const {response} = await soap({
            url: getCoin.url,
            headers: getCoin.header,
            xml: xmlRequest
        })

        const {body} = response
        parseString(body, async (err: any, result: any) =>{
            coin = result["S:Envelope"]["S:Body"][0]["ns2:getCoinsResponse"][0]["return"][0]
        })

        return res.status(200).send({coin:coin, status:'ok'})
    }catch (e) {
        return res.status(500).send({coin:null, status:"Can't connect soap service"})
    }
}

export async function AddCoin(req:Request, res:Response){
    const uuid = await FindUuidByAccessToken(req,res)
    if (!uuid)
        return res.status(401).send({status:"Uuid doesn't exists"})

    if (req.body == null)
        return res.status(400).send({status:"Uuid doesn't exists"})

    const {coin} = req.body
    if (!coin)
        return res.status(400).send({status:"Coin doesn't exists"})

    const xmlRequest = util.format(addCoin.template, uuid, parseInt(coin))

    try{
        await soap({
            url: addCoin.url,
            headers: addCoin.header,
            xml: xmlRequest
        })

        return res.status(200).send({status:'ok'})
    }catch (e) {
        return res.status(500).send({status:"Can't connect soap service"})
    }
}

export async function SubtractCoin(req:Request, res:Response){
    const uuid = await FindUuidByAccessToken(req,res)
    if (!uuid)
        return res.status(401).send({status:"Uuid doesn't exists"})

    if (req.body == null)
        return res.status(401).send({status:"Uuid doesn't exists"})

    const {coin} = req.body
    const xmlRequest = util.format(subtractCoin.template, uuid, parseInt(coin))

    try{
        await soap({
            url: subtractCoin.url,
            headers: subtractCoin.header,
            xml: xmlRequest
        })

        return res.status(200).send({status:'ok'})
    }catch (e) {
        return res.status(500).send({status:"Can't connect soap service"})
    }
}

export async function NewCoinAccount(uuid: string){
    const xmlRequest = util.format(newCoinAccount.template, uuid)
    let coin: object = []

    try{
        const {response} = await soap({
            url: newCoinAccount.url,
            headers: newCoinAccount.header,
            xml: xmlRequest
        })

        const {body} = response
        parseString(body, async (err: any, result: any) =>{
            coin = result
        })

        return true
    }catch (e) {
        return false
    }
}