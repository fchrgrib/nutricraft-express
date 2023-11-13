import * as util from "util";
import {getSubscriber} from "../template/subscribe.soap.template"
import {parseString} from 'xml2js'

const soap = require('easy-soap-request')

export async function GetSubscribers (uuid: string){
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

        return subscribers
    }catch (e) {
        return null
    }
}