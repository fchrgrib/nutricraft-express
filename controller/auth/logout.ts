import { Request, Response } from 'express';

export default function Logout (req:Request, res:Response) {
    res.clearCookie('token')
    res.status(200).send({status:"successfully logout"})
}