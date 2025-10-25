import Fastify from 'fastify';
import { routes } from './routes.js';
import cors from '@fastify/cors'

const app = Fastify({ logger: true})

const start = async () => {

    await app.register(cors,{
      origin: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    
    });
    await app.register(routes);
    
    try{
        await app.listen({port: 3333})
    }catch(err){
     process.exit(1)
    }
}


start();
