import {Express} from "express";
import AuthRouter from "./auth/auth.router";
import ContentRouter from "./content/content.router";
import ForumRouter from "./forum/forum.router";

export default function MainRouter(router: Express) {
    AuthRouter(router)
    ContentRouter(router)
    ForumRouter(router)
}