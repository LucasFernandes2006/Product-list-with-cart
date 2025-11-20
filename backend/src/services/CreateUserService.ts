import prismaClient from "../prisma/index.js";
interface CreateUserProps{
  name: string ,
  email: string,
  date_of_birth: string, 
  password: string,
}
class CreateUserService {
    async execute({name, email, date_of_birth, password}: CreateUserProps){

        if(!name || !email|| !date_of_birth || !password){
            throw new Error("Fill in all fields")
        }

        const findEmail = await prismaClient.user.findUnique({where:{email: email}})
        if(findEmail){
            
            throw new Error("Email already registered")
        }
        else{
        const user =  await prismaClient.user.create({ // Parte do código respossável por criar o novo item. O "await prismaClient.user.create" refere-se a um novo item a ser criado, o "user" é o nome da tabela no mongoBD
            data:{
                name, 
                email, 
                date_of_birth, 
                password,
            }
        })

            return user
        }
        
    }
}

export {CreateUserService}