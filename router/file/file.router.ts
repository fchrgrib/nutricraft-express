import {Express} from "express";
import {CreateFile, DeleteFile, FindFileById, StaticFile, UpdateFile} from "../../controller/file/file";
import {upload} from "../../handler/middleware/multer";

export function FileRouter(router:Express){
    router.get('/image', StaticFile)
    router.get('/image/:id',FindFileById)
    router.post('/image', upload.single("Image"), CreateFile)
    router.put('/image/:id', upload.single("Image"), UpdateFile)
    router.delete('/image/:id', DeleteFile)
}