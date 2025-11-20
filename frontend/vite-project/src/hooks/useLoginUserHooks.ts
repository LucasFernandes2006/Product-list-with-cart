import type {FormEvent} from 'react'
import { api } from '../services/api'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


export default function useLoginUserHooks (){
    
    const navigate = useNavigate();
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useLoginUserHooks deve ser usado dentro de um UserProvider");
    }

    const { loginUser, userInfo } = context;
    

    useEffect(() => {
        if (loginUser && loginUser.name) 
        {
            navigate('/mainScreen');
        }
    }, [loginUser]);

    async function userSubmit(event:FormEvent<HTMLFormElement>, email:React.RefObject<HTMLInputElement|null>,password:React.RefObject<HTMLInputElement|null>){
        event.preventDefault();
        try{
            if(!email.current?.value ||!password.current?.value)  
                {
                    alert("É necessário preencher todos os campos")
                };
            
            const response = await api.post("/listUser", {
            email: email.current?.value, 
            password: password.current?.value,           
            })
        
        userInfo(response.data.name,response.data.user_type)
        console.log(response.data.name,response.data.user_type)
        console.log(loginUser)
        
        } catch(error){
            if(error instanceof AxiosError){
                const errorMessage = error.response?.data?.message || error.message;
                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: (errorMessage),
                }); 
            }
        }
    }
    return{
        userSubmit,
        loginUser
    }
}