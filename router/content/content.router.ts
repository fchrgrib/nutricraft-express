import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {
    CreateContent, DeleteContent,
    FindAllContent,
    FindContentByCreator,
    FindContentById,
    UpdateContent
} from "../../controller/content/content";

export default function ContentRouter(router: Express){
    router.use('/content', Middleware)
    router.get('/content', FindAllContent)
    router.get('/content/:id', FindContentById)
    router.delete('/content/:id', DeleteContent)
    router.post('/content', CreateContent)
    router.put('/content/:id',UpdateContent)
    router.get('/content/creator/:id', FindContentByCreator)
}