import '../pageStyle/App.css'
import image from '../assets/images/image-waffle-desktop.jpg'
import image2 from '../assets/images/image-waffle-tablet.jpg'
import image3 from '../assets/images/image-waffle-mobile.jpg'
import noItem from '../assets/images/illustration-empty-cart.svg'


import { useEffect, useState } from 'react'
import { api } from '../services/api'


interface DessertProps{
  id: string;
  name: string;
  second_name: string;
  description: string;
  price: number
}

export default function App() {
  
  const [dessert, setDessert] = useState<DessertProps[]>([])

  useEffect(()=> {
    loadDesserts(); 
  },[])

  async function loadDesserts(){
    const response = await api.get("/listDesserts")
    setDessert(response.data);
  }
  
  return (
    <div>
      <h1>Desserts</h1>
    <main>
      
      <div className="div-items">

        {dessert.map( (dessertInfo)=> (
          
          <div className="card-item" key={dessertInfo.id}>
          <picture>
            <source media="(min-width:993px)" srcSet={image} />
            <source media="(min-width:769px)" srcSet={image2} />
            <img src={image3} alt="" />
          </picture>

          <div className="btn-local">
            <div className="btn_car" data-number="0" data-valor="6.50">
              <div className="btn_txt">
                <img src="src/images/icon-add-to-cart.svg" alt="" srcSet="" />
                <strong>Add to Cart</strong>
              </div>
            </div>
            <div className="btn-orange">
              <div className="btn-quanti decrement" data-number="0" data-valor="6.50">
                <img src="src/images/icon-decrement-quantity.svg" />
              </div>

              <output className="num-itens"></output>

              <div className="btn-quanti increment" data-number="0" data-valor="6.50">
                <img src="src/images/icon-increment-quantity.svg" />
              </div>
            </div>
          </div>

          <div className="item-text">
            <p className="name-item"> {dessertInfo.name}</p>
            <p className="secund-name-item"><strong>{dessertInfo.second_name}</strong></p>
            <p className="value-item"><strong>${dessertInfo.price.toFixed(2)}</strong></p>
          </div>
        </div>


        ))}
        
      </div>

      <div className="added-box">
        <div className="added-items">
          <h2>Your Cart (<output className="quanti-items">0</output>)</h2>
          <div className="chosen-items">
            <div className="order-card">

              <div className="order-text">
                <h4>Waffle with Berries</h4>
                <div className="order-information">
                  <div className="order-values">
                    <h4><output className="item-quanti"></output>x</h4>
                    <p className="initial-value">@ $6.50</p>
                    <p>$<output className="final-value"></output></p>
                  </div>
                  <img src="src/images/icon-remove-item.svg" className="remone_item" data-number="0" />
                </div>
              </div>

              <div className="finalize-order">
                <div className="order-total">
                  <p>Order Total</p>
                  <h3>
                    $<output className="total-value"></output>
                  </h3>
                </div>
                <div className="carbon-neutral">
                  <img src="src/images/icon-carbon-neutral.svg" alt="" />
                  <p>This is a <strong>carbon-neutral</strong> delivery</p>
                </div>
              </div>

              <div className="btn-chosen">
                <h3>Confirm Order</h3>
              </div>

            </div>

            <div className="no_items">
              <img src={noItem} alt=""/>
                <p><strong>Your added items will appear here</strong></p>
            </div>
          </div>
        </div>
      </div>

    </main>
    </div>
  )
}