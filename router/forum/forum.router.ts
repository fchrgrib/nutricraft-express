import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {CreateForum, DeleteForum, FindAllForum, FindForumById, UpdateForum} from "../../controller/forum/forum";


export default function ForumRouter(router:Express){
    router.use('/forum', Middleware)
    router.get('/forum', FindAllForum)
    router.post('/forum', CreateForum)
    router.delete('/forum/:id', DeleteForum)
    router.put('/forum/:id', UpdateForum)
    router.get('/forum/:id', FindForumById)
}