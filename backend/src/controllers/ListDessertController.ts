import type { FastifyRequest, FastifyReply } from "fastify"
import { ListDessertService } from "../services/ListDessertService.js";

class ListDessertController{
    async handle(request:FastifyRequest, replay:FastifyReply){
        const listDessertService = new ListDessertService();

        const listDesserts = await listDessertService.execute();

        replay.send(listDesserts);
    }
}

export{ListDessertController}