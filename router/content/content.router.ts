import {Express} from "express";
import Middleware from "../../handler/middleware/middleware";
import {
    CreateContent, DeleteContent,
    FindAllContent,
    FindContentByUuid,
    FindContentById, FindContentByTitle,
    UpdateContent, FindContentByCreator, FindContentBySubscriberTitle, FindContentBySubscriber
} from "../../controller/content/content";
import UserAccess from "../../handler/middleware/user.access";


export default function ContentRouter(router: Express){
    router.get('/content', UserAccess, FindAllContent)
    router.get('/content/:id', FindContentById)
    router.get('/content/creator/:uuid', FindContentByUuid)
    router.get('/content/creator', UserAccess, FindContentByCreator)
    router.post('/content/title', FindContentByTitle)
    router.post('/content/title/subscriber', FindContentBySubscriberTitle)
    router.post('/content/subscriber', FindContentBySubscriber)
    router.post('/content', Middleware, CreateContent)
    router.delete('/content/:id', Middleware, DeleteContent)
    router.put('/content/:id', Middleware, UpdateContent)
}