import type { FastifyRequest, FastifyReply } from "fastify"

import {UpdateDessertService} from '../services/UpdateDessertService.js'

class UpdateDessertController{
    async handle(request:FastifyRequest, replay: FastifyReply){

        const {id,name,second_name, description, price, image} = request.body as {id: string, name: string, second_name:string, description:string, price:number, image:string };

        const dessertService =  new UpdateDessertService()

        const dessert = await dessertService.execute({id,name, second_name, description, price, image });

        replay.send(dessert)
    }
}

export {UpdateDessertController}