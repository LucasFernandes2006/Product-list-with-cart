import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

//Rotas referente as sobremessas  
import { CreateDessertController } from "./controllers/CreateDessertController.js";
import { ListDessertController } from "./controllers/ListDessertController.js";
import { UpdateDessertController } from "./controllers/UpdateDessertController.js";
import { DeleteDessertController } from "./controllers/DeleteDessertController.js";

//Rotas referente ao usuário 
import { CreateUserController } from "./controllers/CreateUserController.js";
import { ListUserController } from "./controllers/ListUserController.js";

export async function routes(fastify:FastifyInstance, options: FastifyPluginOptions){
    fastify.get("/teste", async(request: FastifyRequest, replay: FastifyReply)=>{
        return {ok :true}
    })

    fastify.post("/createDesser", {
        schema:{
            summary: 'Create a new dessert ',
            body:{
                type:'object',
                required: ['name', 'second_name', 'description', 'price', 'image'],
                properties:{
                    name: { type: 'string' },
                    second_name: { type: 'string' },
                    description: { type: 'string'},
                    price: { type: 'number' },
                    image: { type: 'string' }                       
                }
            },
            response:{
                201:{
                    type: 'object',
                    properties:{
                        name: { type: 'string' },
                        second_name: { type: 'string' },
                        description: { type: 'string'},
                        price: { type: 'number' }
                    }
                }
            }
        }
    },
        async (request:FastifyRequest, replay:FastifyReply) => {
        return new CreateDessertController().handle(request, replay)
    })

    fastify.get("/listDesserts", {
        schema:{
            summary: 'list all desserts',
            response:{
                201:{
                    type: 'object',
                    properties:{
                        id:{ type: 'string'},
                        name: { type: 'string' },
                        second_name: { type: 'string' },
                        description: { type: 'string'},
                        price: { type: 'number' },
                        image: { type: 'string' }   
                    }
                }
            }
        }
    }, async(request: FastifyRequest, replay: FastifyReply)=>{
        return new ListDessertController().handle(request, replay)
    })

    fastify.put("/updateDesserts", {
        schema:{
            summary: 'Update a dessert',
            body:{
                type:'object',
                required: ['name', 'second_name', 'description', 'price', 'image'],
                properties:{
                    name: { type: 'string' },
                    second_name: { type: 'string' },
                    description: { type: 'string'},
                    price: { type: 'number' },
                    image: { type: 'string' }                    
                }
            },
            response:{
                201:{
                    type: 'object',
                    properties:{
                        id:{ type: 'string'},
                        name: { type: 'string' },
                        second_name: { type: 'string' },
                        description: { type: 'string'},
                        price: { type: 'number' },
                        image: { type: 'string' }  
                    }
                }
            }
        }
    }, async(request: FastifyRequest, replay: FastifyReply)=>{
        return new UpdateDessertController().handle(request, replay)
    })

    fastify.delete("/deleteDesserts", {
        schema:{
            summary: 'Delet a dessert ',
            querystring: {
                type: 'object',
                required: ['id'],
                properties: {
                id: { type: 'string' }
                }
            }
        }
    },  async(request: FastifyRequest, replay: FastifyReply)=>{
        return new DeleteDessertController().handle(request, replay)
    })

    fastify.post("/createUser", {
        schema:{
            summary: 'Create a new user ',
            body:{
                type:'object',
                required: ['name', 'email', 'date_of_birth', 'password'],
                properties:{
                    name: { type: 'string' },
                    email: { type: 'string' },
                    date_of_birth: { type: 'string', format: 'date' },
                    password: { type: 'string' }                   
                }
            },
            response:{
                201:{
                    type: 'object',
                    properties:{
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        date_of_birth: { type: 'string', format: 'date' },
                        user_type:{type: 'string'}
                    }
                }
            }
        }
    }, async (request:FastifyRequest, replay:FastifyReply) => {
        return new CreateUserController().handle(request, replay)
    })

    fastify.post("/listUser", {
        schema:{
            summary: 'List a user',
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
            }
            },
            response:{
                201:{
                    type: 'object',
                    properties:{
                        email: { type: 'string' },
                        user_type:{type: 'string'}
                    }
                }
            }
        }
    },  async(request: FastifyRequest, replay: FastifyReply)=>{
        return new ListUserController().handle(request, replay)
    })
}




