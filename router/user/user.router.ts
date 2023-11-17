import {Express} from "express";
import {DeleteUser, FindAllUser, FindUserById, FindUserByUuid, UpdateUser} from "../../controller/user/user";
import UserAccess from "../../handler/middleware/user.access";
import Middleware from "../../handler/middleware/middleware";
import {GetCoin} from "../../soap/service/coin.soap.service";
import {GetExp} from "../../soap/service/level.soap.service";

export default function UserRouter(router: Express){
    router.use('/user',UserAccess)
    router.get('/user', FindAllUser)
    router.get('/user/:id', FindUserById)
    router.post('/user', FindUserByUuid)
    router.put('/user/:id', UpdateUser)
    router.delete('/user/:id', DeleteUser)
    router.get('/coin/:uuid',Middleware, async (req,res)=>{
        const uuid =req.params['uuid']
        const getCoin = await GetCoin(uuid)
        if (!getCoin)
            return res.status(400).send({coin:null, status:"didn't find any coin"})
        return res.status(200).send({coin:parseInt(getCoin), status:"ok"})
    })
    router.get('/exp/:uuid',Middleware, async (req, res)=>{
        const uuid = req.params['uuid']
        const getExp = await GetExp(uuid)
        if (!getExp)
            return res.status(400).send({exp:null, status:"didn't find any coin"})
        return res.status(200).send({exp:getExp, status:"ok"})
    })
}