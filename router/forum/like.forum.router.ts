import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {CreateLike, DeleteLike} from "../../controller/forum/like.forum";

export default function LikeForumRouter(router:Express){
    router.use('/like', Middleware)
    router.post('/like', CreateLike)
    router.delete('/like/:id', DeleteLike)
}