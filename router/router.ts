import {Express} from "express";
import AuthRouter from "./auth/auth.router";
import ContentRouter from "./content/content.router";

export default function MainRouter(router: Express) {
    AuthRouter(router)
    ContentRouter(router)
}