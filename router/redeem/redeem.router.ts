import {Express} from "express";
import RedeemAccess from "../../handler/middleware/redeem.access";
import {AddRedeem, CreateRedeem, DeleteRedeem, FindAllRedeem, UpdateRedeem} from "../../controller/redeem/redeem";
import Middleware from "../../handler/middleware/middleware";

export default function RedeemRouter(router: Express){
    router.post('/redeem', RedeemAccess, CreateRedeem)
    router.put('/redeem', RedeemAccess, UpdateRedeem)
    router.delete('/redeem', RedeemAccess, DeleteRedeem)
    router.get('/redeem', Middleware, FindAllRedeem)
    router.post('/redeem/user', Middleware, AddRedeem)
}