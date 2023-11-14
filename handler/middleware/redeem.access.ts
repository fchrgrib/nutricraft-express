import { Request, Response, NextFunction } from 'express';

export default async function RedeemAccess(req: Request, res: Response, next: NextFunction){
    const apiKey = req.query['APIkey']
    const secretKey = process.env.REDEEM_KEY

    console.log(`Api key=${apiKey}\nsecret key=${secretKey}`)

    if (!secretKey)
        return res.status(401).send({status:"Invalid key"})

    if (!(secretKey === apiKey))
        return res.status(401).send({status:"Invalid key"})

    next()
}