import { Request, Response, NextFunction } from 'express';

export default async function RedeemAccess(req: Request, res: Response, next: NextFunction){
    const apiKey = req.query['APIkey']
    const secretKey = process.env.REDEEM_KEY

    if (!secretKey)
        return res.status(401).send({status:"Invalid key"})

    if (secretKey === apiKey)
        next()

    return res.status(401).send({status:"Invalid key"})
}