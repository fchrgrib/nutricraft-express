import {Express} from "express";
import Login from "../../controller/auth/login";
import Register from "../../controller/auth/register";
import Logout from "../../controller/auth/logout";

export default function AuthRouter(router: Express){
    router.post('/login', Login)
    router.post('/register', Register)
    router.delete('/logout', Logout)
}