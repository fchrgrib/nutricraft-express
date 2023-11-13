import multer from "multer";
import {randomUUID} from "crypto";

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any)=>{
        cb(null, "./storage/assets/")
    },
    filename: (req: any, file: any, cb: any)=>{
        cb(null, `${randomUUID()}.${file.mimetype.split("/")[1]}`)
    }
})

export const upload = multer({storage:storage})

