import {Express} from "express";
import {DeleteUser, FindAllUser, FindUserById, FindUserByUuid, UpdateUser} from "../../controller/user/user";
import UserAccess from "../../handler/middleware/user.access";

export default function UserRouter(router: Express){
    router.use('/user',UserAccess)
    router.get('/user', FindAllUser)
    router.get('/user/:id', FindUserById)
    router.post('/user', FindUserByUuid)
    router.put('/user/:id', UpdateUser)
    router.delete('/user/:id', DeleteUser)
}