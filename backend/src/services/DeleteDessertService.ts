import prismaClient from "../prisma/index.js"

interface DeleteDessertProps{
    id:string;
}

class DeleteDessertService{
    async execute({id}: DeleteDessertProps){

        if(!id){
        
        throw new Error("Id não encontardo")
        
        }

        const findItem = await prismaClient.dessert.findFirst({
            where:{
              id: id  
            }
        })

        if(!findItem){
            throw new Error ("Sobremessa não encontrada")
        }

        await prismaClient.dessert.delete({
            where:{
                id: findItem.id
            }
        })

        return {message: "Deletado sem problemas"}
    }
}

export {DeleteDessertService}
