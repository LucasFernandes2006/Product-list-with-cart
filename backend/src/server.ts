import Fastify from 'fastify';
import { routes } from './routes.js';
import cors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui'

const app = Fastify({ logger: true})

const start = async () => {

    await app.register(cors,{
      origin: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    
    });


    await app.register(fastifySwagger, {
      openapi:{
        info:{
          title: "Dessert Shop API",
          description: 'Documentação da API do Projeto Semestral',
          version: '1.0.0'
        }
      }
    });
    
    
    await app.register(fastifySwaggerUi, {
      routePrefix: '/docs', 
    })

    app.register(fastifyFormbody);
    await app.register(routes);
    
    try{
        await app.listen({port: 3333})
    }catch(err){
     process.exit(1)
    }
}


start();
