import { useState, useRef, useEffect } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { api } from '../services/api'
import '../pageStyle/HandleDesserts.css'

interface DessertProps{
  id: string;
  name: string;
  second_name: string;
  description: string;
  price: number;
  image:string
}

export default function HandleDesserts() {
  
  
  const [image, setImage] =  useState<string> ("")
  const [imageUpdate, setImageUpadate] =  useState<string> ("")

  const nameRef =  useRef<HTMLInputElement | null> (null)
  const secundNameRef =  useRef<HTMLInputElement | null> (null)
  const desRef =  useRef<HTMLInputElement | null> (null)
  const priceRef =  useRef<HTMLInputElement | null> (null)

  const nameRefUpdate =  useRef<Record<string, HTMLInputElement | null>>({})
  const secundNameRefUpdate =  useRef<Record<string,HTMLInputElement | null>> ({})
  const desRefUpdate =  useRef<Record<string,HTMLTextAreaElement | null>> ({})
  const priceRefUpdate =  useRef<Record<string,HTMLInputElement | null>> ({})
  const imageLoad =  useRef<Record<string,HTMLImageElement| null>> ({})
  


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
  async function dessertSubmit(event:FormEvent){
    
    
    event.preventDefault();
    if(!nameRef.current?.value || !secundNameRef.current?.value || !desRef.current?.value ||!priceRef.current?.value || image == "")  {alert("É necessário preencher todos os campos")};
      
    const response = await api.post("/createDesser", {

      name: nameRef.current?.value , 
      second_name:secundNameRef.current?.value , 
      description:desRef.current?.value , 
      price: Number(priceRef.current?.value),
      image: image
    })

      console.log(response.data)
      location.reload()
      
  }

  //função para atualizar as sobremesas
  async function updateDesserts(id:string){
    
    if(!nameRefUpdate.current[id]?.value || !secundNameRefUpdate.current[id]?.value || !desRefUpdate.current[id]?.value ||!priceRefUpdate.current[id]?.value)  {alert("Nem um campo pode ficar vazio")};

    console.log(nameRefUpdate.current[id]?.value )
    console.log(secundNameRefUpdate.current[id]?.value )
    console.log(desRefUpdate.current[id]?.value )
    console.log(priceRefUpdate.current[id]?.value )


    const response = await api.put("/updateDesserts",{
      id: id,
      name: nameRefUpdate.current[id]?.value,
      second_name: secundNameRefUpdate.current[id]?.value,
      description: desRefUpdate.current[id]?.value,
      price: Number(priceRefUpdate.current[id]?.value),
      image: imageUpdate != "" ? imageUpdate: imageLoad.current[id]?.src
    })
    console.log(response.data)
    alert(`As sobremesa ${nameRefUpdate.current[id]?.value} foi atulizada`)
    location.reload()
  }

  //função para apagar as sobremesas
  async function deletDesserts(id:string){

    await api.delete("/deleteDesserts", {
      params:{
        id: id,
      }
    })
    location.reload()
  }

  
  return (
    <>
    <h1>Create Dessert</h1>
    <div className='newDessert'>

      <form action="dessertForm" onSubmit={dessertSubmit}>
          <div className='imageDessert'>
            <div className='auto_inner'>
              Insert an image

              <input 
              accept= "image/" 
              type="file" 
              onChange={converToBase64}
              />
              <img  src={image || undefined} />
              
            </div>
            <div className='dessertInfo'>
              <strong>Nane</strong>
              <input className= "nameDessert" type="text" placeholder='Enter the name of the Dessert' ref={nameRef}/><br/>
              <strong>Secund Nane</strong>
              <input className= "secundNameDessert" type="text" placeholder='Enter the secund name of the Dessert' ref={secundNameRef}/><br/>
              <strong>Description</strong>
              <input className= "descDessert" type="text" placeholder='Enter the description of the Dessert' ref={desRef}/><br/>
              <strong>Price</strong>
              <input className= "pricecDessert" type="number" placeholder='Enter the price of the Dessert' step='any' ref={priceRef} /><br/>
              
              <input type="submit" value="Cadastrar"/>

            </div>
          </div>
        </form>
      </div>
      <div className='editeDesset'>

        <h1>Existing Desserts</h1>
          <div className='listeDesset'>
            
            
            {dessert.map( (dessertInfo)=> (
              <div className='listedDesset' key={dessertInfo.id}>

                    <div className="item-info">
                        <img className='imgDesset' src={dessertInfo.image} ref={el => {imageLoad.current[dessertInfo.id] = el}} alt="" />
                        
                        <div className="confirm-order-values">
                            

                            <h4>Name: <input type="text" defaultValue={dessertInfo.name} ref={el => {nameRefUpdate.current[dessertInfo.id]= el}}/></h4>

                            <h4>Segund Name: <input type="text" defaultValue={dessertInfo.second_name} ref={el => {secundNameRefUpdate.current[dessertInfo.id]= el}}/></h4>

                            <h4>Description: <textarea defaultValue={dessertInfo.description}  ref={el => {desRefUpdate.current[dessertInfo.id]= el}} /></h4>

                            <p className="initial-value confirm">$  <input type="number" defaultValue={dessertInfo.price} ref={el => {priceRefUpdate.current[dessertInfo.id]= el}}/> </p>

                            <div className='auto_inner_updated'>
                              Update de Image

                              <input 
                              accept= "image/" 
                              type="file"
                              className={'updateImage'}
                              onChange={converToBase64}
                              key={dessertInfo.id}
                              />                             
                            </div>

                            <button onClick={() => updateDesserts(dessertInfo.id)}> Upadate</button>
                            <button onClick={() => deletDesserts(dessertInfo.id)}>Deleted</button>
                        </div>
                    </div>
              </div>

            ))}

            
          </div>
      </div>
    </>
  )
}