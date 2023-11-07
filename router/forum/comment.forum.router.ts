import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {CreateComment, DeleteComment, UpdateComment} from "../../controller/forum/comment.forum";

export default function CommentForumRouter(router:Express){
    router.use('/comment', Middleware)
    router.post('/comment', CreateComment)
    router.put('/comment/:id',UpdateComment)
    router.delete('/comment/:id',DeleteComment)
}