import type { FastifyRequest, FastifyReply } from "fastify"

import { CreateUserService } from "../services/CreateUserService.js";

class CreateUserController{
    async handle(request:FastifyRequest, replay: FastifyReply){

        const {name, email, date_of_birth, password} = request.body as {name: string, email:string, date_of_birth:string, password:string};

        const dessertService =  new CreateUserService()

        const customer = await dessertService.execute({name, email, date_of_birth, password});

        replay.send(customer)
    }
}

export {CreateUserController}