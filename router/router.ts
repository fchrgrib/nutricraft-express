import {Express} from "express";
import AuthRouter from "./auth/auth.router";
import ContentRouter from "./content/content.router";
import ForumRouter from "./forum/forum.router";
import LikeForumRouter from "./forum/like.forum.router";
import RedeemRouter from "./redeem/redeem.router";
import {FileRouter} from "./file/file.router";
import UserRouter from "./user/user.router";

export default function MainRouter(router: Express) {
    router.use((req,res,next)=>{
        console.log(`🤖 Nutricraft Logging 🤖  ${req.ip} : \x1b[1m${req.method}\x1b[0m ${req.originalUrl} || :${res.statusCode}:`)
        next();
    })

    router.use((req,res, next) => {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });

    AuthRouter(router)
    ContentRouter(router)
    ForumRouter(router)
    ContentRouter(router)
    LikeForumRouter(router)
    RedeemRouter(router)
    FileRouter(router)
    UserRouter(router)
}