import { useState, useEffect, useContext } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { api } from '../services/api'
import Swal from 'sweetalert2';
interface DessertProps{
  id: string;
  name: string;
  second_name: string;
  description: string;
  price: number;
  image:string
}

export default function useHandleDessertsHooks(){
  const [image, setImage] =  useState<string> ("")
  const [imageUpdate, setImageUpadate] =  useState<string> ("")

  const navigate = useNavigate();

        const context = useContext(UserContext);
        if (!context) {
            throw new Error("useLoginUserHooks deve ser usado dentro de um UserProvider");
        }
        const { loginUser, userInfo } = context;
        
        function logoutUser(){
            userInfo("","");
            localStorage.removeItem("loginUser")
            navigate('/');
        }

        function moveHome(){
            navigate('/mainScreen');
        }

  //função para carregar as sobremesas já existentes

    const [dessert, setDessert] = useState<DessertProps[]>([])
  
    useEffect(()=> {
      loadDesserts(); 
    },[])


    async function loadDesserts(){
    const response = await api.get("/listDesserts")
    setDessert(response.data);
  }

  //função para converter imagem em texto
  function converToBase64(e: ChangeEvent<HTMLInputElement>){
    const imageTarget = e.currentTarget
    
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      

      if (typeof reader.result === 'string') {

        const card = imageTarget.closest('.listedDesset') 
        const img = card?.querySelector('img') as HTMLImageElement || null;

        if (e.target.className == "updateImage")
        { 
          img.src = reader.result
          setImageUpadate(reader.result)
          
        }
        else
        {
          setImage(reader.result)
          
        }
        
      }
    };
    reader.onerror = error =>{
      console.log("Error: ", error);
    };
  }

  //função para registrar as sobremesas 
  async function dessertSubmit(event:FormEvent, name:React.RefObject<HTMLInputElement|null>, secondName: React.RefObject<HTMLInputElement|null>, des:React.RefObject<HTMLInputElement|null>, price:React.RefObject<HTMLInputElement|null>){
    
    
    event.preventDefault();
    if(!name.current?.value || !secondName.current?.value || !des.current?.value ||!price.current?.value || image == "")  {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text:"All fields must be filled in.",
      });      
      console.log(name.current?.value)
      console.log(secondName.current?.value)
      console.log(des.current?.value)
      console.log(price.current?.value)
      console.log(image)
    };
      
    const response = await api.post("/createDesser", {
      name: name.current?.value , 
      second_name:secondName.current?.value , 
      description:des.current?.value , 
      price: Number(price.current?.value),
      image: image
    })

      console.log(response.data)
      location.reload()
      
  }

  //função para atualizar as sobremesas
  async function updateDesserts(id:string, updateName:React.RefObject<Record<string, HTMLInputElement | null>>,updateSecondName:React.RefObject<Record<string, HTMLInputElement | null>>, updateDes:React.RefObject<Record<string, HTMLTextAreaElement | null>>,updatePrice:React.RefObject<Record<string, HTMLInputElement | null>>, loadImage:React.RefObject<Record<string,HTMLImageElement| null>> ){
    
    if(!updateName.current[id]?.value || !updateSecondName.current[id]?.value || !updateDes.current[id]?.value ||!updatePrice.current[id]?.value)  
      {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:"Not a single field can remain empty.",
        }); 
      }
    else{
        Swal.fire({
            icon: "success",
            title: (`The dessert ${updateName.current[id]?.value} has been updated.`),
            showConfirmButton: false,
            timer: 1500,
        });
        setInterval(async()=>{
          console.log(updateName.current[id]?.value )
          console.log(updateSecondName.current[id]?.value )
          console.log(updateDes.current[id]?.value )
          console.log(updatePrice.current[id]?.value )

          const response = await api.put("/updateDesserts",{
            id: id,
            name: updateName.current[id]?.value,
            second_name: updateSecondName.current[id]?.value,
            description: updateDes.current[id]?.value,
            price: Number(updatePrice.current[id]?.value),
            image: imageUpdate != "" ? imageUpdate: loadImage.current[id]?.src
          })
          console.log(response.data)

          location.reload()
      },1503)
    }
  }

  //função para apagar as sobremesas
  async function deletDesserts(id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this dessert?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }). then(async(result) => {
        if (result.isConfirmed) {
            await api.delete("/deleteDesserts", {
            params:{
              id: id,
            }
          })
          location.reload()
          }
      });
  }
  return{
    logoutUser,
    moveHome,
    loginUser,
    dessert,
    dessertSubmit,
    converToBase64,
    image,
    updateDesserts,
    deletDesserts
  }
}

