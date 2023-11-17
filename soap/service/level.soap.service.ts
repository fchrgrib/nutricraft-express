import * as util from "util";
import {addExp, getExp, newLevelAccount, subtractExp} from "../template/level.soap.template";
import {parseString} from "xml2js";

const soap = require('easy-soap-request')

export async function GetExp(uuid: string){
    const xmlRequest = util.format(getExp.template, uuid)
    let exp =''

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
        return parseInt(exp)
    }catch (e) {
        return null
    }
}

export async function AddExp(uuid: string, exp: number){
    const xmlRequest = util.format(addExp.template, uuid, exp)
    try{
        await soap({
            url: addExp.url,
            headers: addExp.header,
            xml: xmlRequest
        })

        return true
    }catch (e) {
        return false
    }
}

export async function SubtractExp(uuid: string, exp: number){
    const xmlRequest = util.format(subtractExp.template, uuid, exp)
    try{
        await soap({
            url: subtractExp.url,
            headers: subtractExp.header,
            xml: xmlRequest
        })

        return true
    }catch (e) {
        return false
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