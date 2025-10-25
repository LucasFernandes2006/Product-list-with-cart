import type { FastifyRequest, FastifyReply } from "fastify"
import { DeleteDessertService } from "../services/DeleteDessertService.js"

class DeleteDessertController{
    async handle(request:FastifyRequest, replay:FastifyReply){
        const {id} = request.query as {id :string}

        const dessertService =  new DeleteDessertService();

        const dessert = await dessertService.execute({id})

        replay.send(dessert)
    }
}

export {DeleteDessertController}