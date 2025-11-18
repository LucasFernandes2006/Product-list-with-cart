import '../pageStyle/App.css'

import noItem from '../assets/images/illustration-empty-cart.svg'
import iconCart from '../assets/images/icon-add-to-cart.svg'

import removeIcon from '../assets/images/icon-remove-item.svg'
import carbonIcon from '../assets/images/icon-carbon-neutral.svg'
import incrementIcon from '../assets/images/icon-increment-quantity.svg'
import decrementIcon from '../assets/images/icon-decrement-quantity.svg'
import confirm from '../assets/images/icon-order-confirmed.svg'



import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import useAppHooks from '../hooks/useAppHooks'



interface DessertProps{
  id: string;
  name: string;
  second_name: string;
  description: string;
  price: number;
  image:string
}

export default function App() {
  
  const [dessert, setDessert] = useState<DessertProps[]>([])
  const {addCarFunction, isHidden, isShow, getQuantity, incrementFunction, decrementFunction, totalQuantity,showIndividualTotal,toltalValue, isHiddenNoItems, removeItem, showConfirm,hiddenConfirm, visibleConfirm, AlertSweet} = useAppHooks();

  useEffect(()=> {
    loadDesserts(); 
  },[])

  async function loadDesserts(){
    const response = await api.get("/listDesserts")
    setDessert(response.data);
  }

  
  
  return (
    <div>
      <h1> Desserts</h1>
    <main>
      
      <div className="div-items">

        {dessert.map( (dessertInfo)=> (
          
          <div className="card-item" key={dessertInfo.id}>
          <picture>
            <source media="(min-width:993px)" srcSet={dessertInfo.image} />
            <source media="(min-width:769px)" srcSet={dessertInfo.image} />
            <img src={dessertInfo.image} alt="" />
          </picture>
            
          <div className="btn-local">
           
            <div className={`btn_car ${isHidden(dessertInfo.id) ? 'hidden' : ''}`} onClick={() => addCarFunction(dessertInfo.id, dessertInfo.price)} >
              <div className="btn_txt" >
                <img src={iconCart} alt="" srcSet="" />
                <strong >Add to Cart</strong>
              </div>
            </div>

            <div className={`btn-orange ${isShow(dessertInfo.id) ? 'show' : ''}`}>
              <div className="btn-quanti decrement" onClick={() => decrementFunction(dessertInfo.id)}>
                <img src={decrementIcon} />
              </div>

              <output className="num-itens">{getQuantity(dessertInfo.id)}</output>

              <div className="btn-quanti increment" onClick={() => incrementFunction(dessertInfo.id)}>
                <img src={incrementIcon} />
              </div>
            </div>
          </div>

          <div className="item-text">
            <p className="name-item"> {dessertInfo.name}</p>
            <p className="secund-name-item"><strong>{dessertInfo.second_name}</strong></p>
            <p className="value-item"><strong>${dessertInfo.price.toFixed(2).replace(".", ",")}</strong></p>
          </div>
        </div>


        ))}
        
      </div>

      <div className="added-box">
        <div className="added-items">
          <h2>Your Cart (<output className="quanti-items">{totalQuantity}</output>)</h2>
          <div className="chosen-items">
            <div className={`order-card ${isHiddenNoItems()? '' : 'hidden'}`}>

              {dessert.map ((dessertInfo)=>(
                  <div className={`order-text ${isShow(dessertInfo.id) ? 'show' : ''}`} key={dessertInfo.id}>
                  <h4>{dessertInfo.second_name}</h4>
                  <div className="order-information">
                    <div className="order-values">
                      <h4><output className="item-quanti"></output>{getQuantity(dessertInfo.id)}x</h4>
                      <p className="initial-value">{dessertInfo.price.toFixed(2).replace(".", ",")}</p>
                      <p>$<output className="final-value">{showIndividualTotal(dessertInfo.id)}</output></p>
                    </div>
                    <img src={removeIcon} onClick={() => removeItem(dessertInfo.id)} className="remone_item"/>
                  </div>
                </div>
              ))}


              <div className="finalize-order">
                <div className="order-total">
                  <p>Order Total</p>
                  <h3>
                    $<output className="total-value">{toltalValue.toFixed(2).replace(".", ",")}</output>
                  </h3>
                </div>
                <div className="carbon-neutral">
                  <img src={carbonIcon} alt="" />
                  <p>This is a <strong>carbon-neutral</strong> delivery</p>
                </div>
              </div>

              <div className="btn-chosen" onClick={() => showConfirm()}>
                <h3>Confirm Order</h3>
              </div>

            </div>

            <div className= {`no_items ${isHiddenNoItems()? 'hidden' : ''}`}>
              <img src={noItem} alt=""/>
                <p><strong>Your added items will appear here</strong></p> 
            </div>
          </div>
        </div>
      </div>

      <div className= {`confirmed-order ${visibleConfirm() ? 'show' : ''}`}>
            <div className="confirm-icons">
                <img src={confirm} alt=""/>
                <img src={removeIcon} className="btn_exit" onClick={() => hiddenConfirm()}/>
            </div> 

            <h1>Order <br/> Confirmed</h1>
            <p>We hope you enjoy your food!</p>

            <div className="all-confirm-items">
              {dessert.map((dessertInfo)=>(
                
                <div className={`confirm-item ${isShow(dessertInfo.id) ? 'show' : ''}`} key={dessertInfo.id}>
                  <div className="item-info">
                          <img src={dessertInfo.image} alt=""/>
                          
                          <div className="confirm-order-values">
                              <h4>{dessertInfo.second_name}</h4>
                              <strong>
                                  <p className="item-quanti"><output className="item-quanti-confirm"></output>{getQuantity(dessertInfo.id)}x</p>
                              </strong>
                              <p className="initial-value confirm">@${dessertInfo.price.toFixed(2).replace(".", ",")}</p>
                          </div>
                      </div>
                    <h3>$<output className="final-value-confirm">{showIndividualTotal(dessertInfo.id)}</output></h3>
                </div>
              ))}

              <div className="confirm-value"> 
                  <p>Order Total</p>
                  <h3> $<output className="total-value-confirm">{toltalValue.toFixed(2).replace(".", ",")}</output></h3>
              </div>

            </div>
                <div className="btn-local">
                  <div className="confirm-btn" onClick={()=> AlertSweet()}><strong>Start New Order</strong>
                </div>
            </div>           
      </div>

    </main>
    <Link to="/doceAI">
      <button className="chat-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="white" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
</svg>
      </button>
    </Link>
    </div>
  )
}