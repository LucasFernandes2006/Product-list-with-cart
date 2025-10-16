import prismaClient from "../prisma/index.js";
interface CreateDessertProps{
    name: string, 
    second_name: string, 
    description: string, 
    price: number
}
class CreateDessertService {
    async execute({name, second_name, description, price }: CreateDessertProps){

        if(!name || !second_name|| !description || !price){
            throw new Error("Preencha todos os campos")
        }
        
        const dessert =  await prismaClient.dessert.create({ // Parte do código respossável por criar o novo item. O "await prismaClient.dessert.create" refere-se a um novo item a ser criado, o "dessert" é o nome da tabela no mongoBD
            data:{
                name, 
                second_name, 
                description, 
                price
            }
        })
        return dessert
    }
}

export {CreateDessertService}