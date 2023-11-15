import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {
    CreateContent, DeleteContent,
    FindAllContent,
    FindContentByUuid,
    FindContentById, FindContentByTitle,
    UpdateContent, FindContentByCreator
} from "../../controller/content/content";


export default function ContentRouter(router: Express){
    router.get('/content', Middleware, FindAllContent)
    router.get('/content/:id', FindContentById)
    router.get('/content/creator/:uuid', FindContentByUuid)
    router.get('/content/creator', Middleware, FindContentByCreator)
    router.post('/content/title', FindContentByTitle)
    router.post('/content', Middleware, CreateContent)
    router.delete('/content/:id', Middleware, DeleteContent)
    router.put('/content/:id', Middleware, UpdateContent)
}