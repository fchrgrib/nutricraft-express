import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import crypto from "crypto";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use((req,res,next)=>{
    console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${res.statusCode}:`)
    next();
})

app.get('/', (req: Request, res: Response) => {
    const header = {alg:"HS256", typ:"JWT"}
    const payload = {id:1, email:"kontol@gmail.com"}

    const encodeHeader = Buffer.from(JSON.stringify(header)).toString("base64")
    const encodePayload = Buffer.from(JSON.stringify(payload)).toString("base64")

    const signature = crypto
        .createHmac("sha256","kontol-kuda")
        .update(encodeHeader+"."+encodePayload)
        .digest("base64")
    res.send(`${encodeHeader} : ${encodePayload} : ${signature}`);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});