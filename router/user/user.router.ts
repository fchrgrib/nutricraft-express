import {Express} from "express";
import {FindUserById, FindUserByUuid} from "../../controller/user/user";

export default function UserRouter(router: Express){
    router.get('/user/:id', FindUserById)
    router.post('/user', FindUserByUuid)
}