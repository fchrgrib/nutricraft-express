import express, { Express} from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import MainRouter from "./router/router"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const fileUpload = require("express-fileupload")
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
dotenv.config()

app.use((req,res,next)=>{
    console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${res.statusCode}:`)
    next();
})


MainRouter(app)


app.post('/', (req,res)=>{
    console.log(req.f)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});