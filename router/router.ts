import {Express} from "express";
import AuthRouter from "./auth/auth.router";
import ContentRouter from "./content/content.router";
import ForumRouter from "./forum/forum.router";
import LikeForumRouter from "./forum/like.forum.router";
import RedeemRouter from "./redeem/redeem.router";

export default function MainRouter(router: Express) {
    AuthRouter(router)
    ContentRouter(router)
    ForumRouter(router)
    ContentRouter(router)
    LikeForumRouter(router)
    RedeemRouter(router)
}