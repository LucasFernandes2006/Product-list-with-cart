import prismaClient from "../prisma/index.js";
interface CreatedUserProps{
  email: string,
  password: string,
}

class ListUserService {
    async execute({email, password}: CreatedUserProps){
        if(!email|| !password){
            throw new Error("Fill in all fields")
        }

        const findUser = await prismaClient.user.findFirst({where: {AND:[ {email:email}, {password:password}]}})
        if(findUser){
            return findUser
        }
        else{
            throw new Error("Incorrect email or password.")
        }
    }
}

export{ListUserService}