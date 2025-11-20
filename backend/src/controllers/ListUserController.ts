import type { FastifyRequest, FastifyReply } from "fastify"
import { ListUserService } from "../services/ListUserService.js"

class ListUserController {
    async handle(request:FastifyRequest, replay:FastifyReply){
        
        const {email, password} = request.body as {email: string, password: string};
        const listUserService = new ListUserService();

        const listUser =  await listUserService.execute({email, password});

        replay.send(listUser)
        
    }
}

export{ListUserController}