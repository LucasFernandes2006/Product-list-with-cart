import {useRef} from 'react'
import useHandleDessertsHooks from '../hooks/useHandleDessertsHooks';
import '../pageStyle/HandleDesserts.css'

export default function HandleDesserts() {
  const nameRef =  useRef<HTMLInputElement | null> (null)
  const secundNameRef =  useRef<HTMLInputElement | null> (null)
  const desRef =  useRef<HTMLInputElement | null> (null)
  const priceRef =  useRef<HTMLInputElement | null> (null)

  const nameRefUpdate =  useRef<Record<string, HTMLInputElement | null>>({})
  const secundNameRefUpdate =  useRef<Record<string,HTMLInputElement | null>> ({})
  const desRefUpdate =  useRef<Record<string,HTMLTextAreaElement | null>> ({})
  const priceRefUpdate =  useRef<Record<string,HTMLInputElement | null>> ({})
  const imageLoad =  useRef<Record<string,HTMLImageElement| null>> ({})
  const {logoutUser,moveHome, loginUser,dessert, dessertSubmit, converToBase64,image, updateDesserts, deletDesserts }= useHandleDessertsHooks();
  
  return (
    <>
          <nav className="navbar-app">
        <div className="navbar-content">
          <span className="navbar-title">🍰 Dessert Shop, Hello:{loginUser.name} </span>
          
          <div className="navbar-user">
            <button className="navbar-logout" onClick={() => moveHome()}>
              Home
            </button>
            <button className="navbar-logout" onClick={() => logoutUser()}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    <h1>Create Dessert</h1>
    <div className='newDessert'>

      <form action="dessertForm" onSubmit={(e) => dessertSubmit(e, nameRef, secundNameRef, desRef, priceRef)}>
          <div className='imageDessert'>
            <div className='auto_inner'>
              Insert an image

              <input 
              accept= "image/" 
              type="file" 
              onChange={(e) => converToBase64(e)}
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
                              onChange={(e) => converToBase64(e)}
                              key={dessertInfo.id}
                              />                             
                            </div>

                            <button onClick={() => updateDesserts(dessertInfo.id, nameRefUpdate, secundNameRefUpdate, desRefUpdate, priceRefUpdate, imageLoad)}> Upadate</button>
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