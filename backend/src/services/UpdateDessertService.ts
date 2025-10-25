import prismaClient from "../prisma/index.js";

interface UpdateDessertProps{
    id:string,
    name: string, 
    second_name: string, 
    description: string, 
    price: number,
    image:string
}

class UpdateDessertService {

    async execute({id, name, second_name, description, price, image }: UpdateDessertProps){

        if(!id){
            throw new Error("item não encontrado")
        }
        const update =  await prismaClient.dessert.update(
            {
            where:{
            id
        },
        data:{
            name, 
            second_name, 
            description, 
            price, 
            image
        }
    })
    return update
    }
}

export {UpdateDessertService}