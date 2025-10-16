import prismaClient from "../prisma/index.js";

class ListDessertService{
    async execute(){
        const listDesserts = await prismaClient.dessert.findMany()

        return listDesserts
    }
}

export{ListDessertService}