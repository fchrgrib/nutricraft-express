import {Express} from "express";
import {
    CreateFile,
    DeleteFile,
    FindFileById,
    FindPhotoProfileByUuid,
    StaticFile,
    UpdateFile
} from "../../controller/file/file";
import {upload} from "../../handler/middleware/multer";

export function FileRouter(router:Express){
    router.get('/image', StaticFile)
    router.get('/image/:id',FindFileById)
    router.get('/image/profile/:uuid',FindPhotoProfileByUuid)
    router.post('/image', upload.single("file"), CreateFile)
    router.put('/image/:id', upload.single("file"), UpdateFile)
    router.delete('/image/:id', DeleteFile)
}