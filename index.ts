import express, { Express} from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import Middleware from "./handler/middleware/middleware"
import {RedisConf} from "./handler/conf/redis.conf"
import jwt from "jsonwebtoken"
import MainRouter from "./router/router"

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


MainRouter(app)


app.use('/home', Middleware)
app.get('/home', async (req, res)=>{
    const token = req.cookies['token']
    if (token==='') return res.status(401).send({status:'token doesnt exist'})

    const decode = jwt.verify(token,`${process.env.JWT_KEY}${process.env.REFRESH_KEY}`||'')
    if (!(typeof decode === 'object' && 'uuid' in decode && typeof decode.uuid === 'string'))
        return res.status(401).send({status:'token is invalid'})
    const redis = RedisConf()
    await redis.connect()
    try{
        const decodeRefresh = await redis.get(`refresh-token-${decode.uuid}`)
        res.status(200).send({status: `welcome access token: ${token}\nrefresh token:${decodeRefresh}`})
    }catch (e) {
        return res.status(401).send({status:'refreshToken is invalid'})
    }finally {
        redis.disconnect()
    }
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});