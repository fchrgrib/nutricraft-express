import * as util from "util"
import {parseString} from "xml2js";
import {addCoin, getCoin, newCoinAccount, subtractCoin} from "../template/coin.soap.template";

const soap = require('easy-soap-request')

export async function GetCoin(uuid: string){
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
            console.log(result["S:Envelope"]["S:Body"][0]["ns2:getCoinsResponse"][0])
            coin = result["S:Envelope"]["S:Body"][0]["ns2:getCoinsResponse"][0]["return"][0]
        })

        return coin
    }catch (e) {
        return null
    }
}

export async function AddCoin(uuid: string, coin: number){
    const xmlRequest = util.format(addCoin.template, uuid, coin)

    try{
        await soap({
            url: addCoin.url,
            headers: addCoin.header,
            xml: xmlRequest
        })

        return true
    }catch (e) {
        return false
    }
}

export async function SubtractCoin(uuid: string, coin: number){
    const xmlRequest = util.format(subtractCoin.template, uuid, coin)

    try{
        await soap({
            url: subtractCoin.url,
            headers: subtractCoin.header,
            xml: xmlRequest
        })

        return true
    }catch (e) {
        return false
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