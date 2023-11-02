import {prisma}

export default function Register (req, res){

    try{
        let body = []
        if (req.statusCode<400 && req.body.name && req.body.email&&
            req.body.title && req.body.phone_number && req.body.desription)
        {
            body = req.body
        }else{
            console.log("you're not fill all the ")
        }


    }catch (e){
        console.log(e)
        res.sendStatus(400)
        return
    }
}