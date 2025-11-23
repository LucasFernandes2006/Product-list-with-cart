import type {FormEvent} from 'react'
import { api } from '../services/api'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function useRegisterUserHooks (){
    const navigate = useNavigate();
    async function userSubmit(event:FormEvent<HTMLFormElement>, name:React.RefObject<HTMLInputElement|null>, email:React.RefObject<HTMLInputElement|null>, date:React.RefObject<HTMLInputElement|null>, password:React.RefObject<HTMLInputElement|null>){
        event.preventDefault();
        try{
            if(!name.current?.value || !email.current?.value || !date.current?.value ||!password.current?.value)  
                {
                    alert("É necessário preencher todos os campos")
                };
            const response = await api.post("/createUser", {
                name: name.current?.value, 
                email: email.current?.value, 
                date_of_birth: String(date.current?.value), 
                password: password.current?.value,           
            })


        console.log(response.data.name,response.data.user_type )
        navigate('/');
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
        userSubmit
    }
}