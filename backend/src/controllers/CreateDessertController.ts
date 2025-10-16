import type { FastifyRequest, FastifyReply } from "fastify"

import {CreateDessertService} from '../services/CreateDessertService.js'

class CreateDessertController{
    async handle(request:FastifyRequest, replay: FastifyReply){

        const {name, second_name, description, price } = request.body as {name: string, second_name:string, description:string, price:number };

        const dessertService =  new CreateDessertService()

        const customer = await dessertService.execute({name, second_name, description, price });

        replay.send(customer)
    }
}

export {CreateDessertController}