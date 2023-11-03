import express, { Express} from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Auth from "./router/auth/auth.router";
import Middleware from "./handler/middleware/middleware";
import {PrismaClient} from "@prisma/client";
import {RedisConf} from "./conf/redis.conf";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use((req,res,next)=>{
    console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${res.statusCode}:`)
    next();
})

app.get('/',async (req,res)=>{
    const redis = RedisConf()
    await redis.connect()
    await redis.set('token','aoifjoagoisdjgsdogisgosidgjisg')
    await redis.expire('token',10)
    res.send({status:'ok'})
})
app.get('/nyobaredis',async (req, res)=>{
    const redis = RedisConf()
    await redis.connect()
    try{
        const cek = await redis.get('token')
        if (cek) {
            return res.send({status: cek})
        }
        return res.send({status:'token doesnt exist'})
    }catch (e) {
        return res.send({status:'token doesnt exist'})
    }

})
Auth(app)
app.use('/home', Middleware)
app.get('/home', async (req, res)=>{
    const redis = RedisConf()
    await redis.connect()
    const token = await redis.get('token')
    res.status(200).send({status: `welcome ${token}`})
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});