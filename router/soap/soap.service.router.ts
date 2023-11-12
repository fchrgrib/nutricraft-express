import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {GetSubscribers} from "../../soap/service/subscribe.soap.service";
import {AddCoin, GetCoin, SubtractCoin} from "../../soap/service/coin.soap.service";


export default function SoapServiceRouter(router:Express){
    router.get("/subscribers", Middleware, GetSubscribers)

    router.get("/coin",Middleware, GetCoin)
    router.post("/add-coin", Middleware, AddCoin)
    router.post("/subtract-coin", Middleware, SubtractCoin)


}