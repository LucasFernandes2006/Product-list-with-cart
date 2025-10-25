import type { FastifyRequest, FastifyReply } from "fastify"

import {CreateDessertService} from '../services/CreateDessertService.js'

class CreateDessertController{
    async handle(request:FastifyRequest, replay: FastifyReply){

        const {name, second_name, description, price, image} = request.body as {name: string, second_name:string, description:string, price:number, image:string };

        const dessertService =  new CreateDessertService()

        const customer = await dessertService.execute({name, second_name, description, price, image });

        replay.send(customer)
    }
}

export {CreateDessertController}