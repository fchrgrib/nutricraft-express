import express, { Express} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import MainRouter from "./router/router"

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser())
app.use(cookieParser())
app.use(cors({credentials: true, origin:['http://localhost:3000','http://nutricraft-spa', 'http://192.168.0.12:3000', 'http://172.18.0.1:3000'], methods: ['GET', 'POST', 'PUT', 'DELETE'],}))
app.use(express.static('image'))
dotenv.config()
MainRouter(app)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});