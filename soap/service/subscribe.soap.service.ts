import {Request, Response} from 'express'
import * as util from "util";
import {getSubscriber} from "../template/subscribe.soap.template"
import {parseString} from 'xml2js'
import {FindUuidByAccessToken} from "../../utils/jwt.utils";

const soap = require('easy-soap-request')

export async function GetSubscribers (req:Request, res:Response){
    const uuid = await FindUuidByAccessToken(req,res)
    if (!uuid)
        return res.status(401).send({subscribers:[], status:"Uuid doesn't exists"})

    const xmlRequest = util.format(getSubscriber.template, uuid)
    let subscribers :object = []
    try{
        const {response} = await soap({
            url: getSubscriber.url,
            headers: getSubscriber.header,
            xml: xmlRequest
        })

        const {body} = response
        parseString(body, async (err: any, result: any) => {
            subscribers = result["S:Envelope"]["S:Body"][0]["ns2:getSubscribersResponse"][0]["return"]
        })

        return res.status(200).send({subscribers:subscribers, status:'ok'})
    }catch (e) {
        return res.status(500).send({subscribers:[], status:"Can't connect soap service"})
    }
}