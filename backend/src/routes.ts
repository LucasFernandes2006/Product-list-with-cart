import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateDessertController } from "./controllers/CreateDessertController.js";
import { ListDessertController } from "./controllers/ListDessertController.js";
import { UpdateDessertController } from "./controllers/UpdateDessertController.js";
import { DeleteDessertController } from "./controllers/DeleteDessertController.js";
export async function routes(fastify:FastifyInstance, options: FastifyPluginOptions){
    fastify.get("/teste", async(request: FastifyRequest, replay: FastifyReply)=>{
        return {ok :true}
    })

    fastify.post("/createDesser", async (request:FastifyRequest, replay:FastifyReply) => {
        return new CreateDessertController().handle(request, replay)
    })

    fastify.get("/listDesserts", async(request: FastifyRequest, replay: FastifyReply)=>{
        return new ListDessertController().handle(request, replay)
    })

    fastify.put("/updateDesserts", async(request: FastifyRequest, replay: FastifyReply)=>{
        return new UpdateDessertController().handle(request, replay)
    })

    fastify.delete("/deleteDesserts", async(request: FastifyRequest, replay: FastifyReply)=>{
        return new DeleteDessertController().handle(request, replay)
    })
}




