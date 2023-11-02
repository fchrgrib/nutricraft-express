import express, { Express} from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Auth from "./router/auth/auth.router";
import Middleware from "./handler/middleware/middleware";

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
Auth(app)
app.use('/home', Middleware)
app.get('/home', (req, res)=>{
    res.status(200).send({status: `welcome ${req.cookies['token']}`})
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});