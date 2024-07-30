
const add_car = document.querySelectorAll("div.btn_car")
const add_orange = document.querySelectorAll("div.btn-orange")
const add_btn = document.querySelectorAll("img.btn-quanti.increment")
const remove_btn = document.querySelectorAll("img.btn-quanti.decrement")

const box_items = document.querySelector("div.div-items")
const box_cart = document.querySelector("div.added-box")
const box_confirm = document.querySelector("div.confirmed-order")

const btn_confirm_order = document.querySelector("div.btn-chosen")

const card_txt = document.querySelectorAll("div.order-text")
const card_confirm = document.querySelectorAll("div.confirm-item")
const box_noItems = document.querySelector("div.no_items")
const orders_local = document.querySelector("div.order-card")

let total_itens = document.querySelectorAll("output.num-itens")
let cart_number = document.querySelector("output.quanti-items")
let quanti_output = document.querySelectorAll("output.item-quanti")
let value_multi = document.querySelectorAll("output.final-value")
let final_cont = document.querySelector("output.total-value")

let quanti_confirm = document.querySelectorAll("output.item-quanti-confirm")
let multi_confirm = document.querySelectorAll("output.final-value-confirm")
let final_confirm = document.querySelector("output.total-value-confirm")

const exit_btn = document.querySelector("img.btn_exit")

const new_Order = document.querySelector("div.confirm-btn")

function car_btn (btn){
    let indice= btn.target.dataset.number
    
    let valor_item= btn.target.dataset.valor


    cart_number.value = Number(cart_number.value)+1

    total_itens[indice].value = Number(total_itens[indice].value)+1

    quanti_output[indice].value = Number(quanti_output[indice].value)+1

    mult_result = quanti_output[indice].value * valor_item
    
    mult_result = quanti_output[indice].value * valor_item
    
    value_multi[indice].value = mult_result.toFixed(2)

    add_car[indice].style.display= "none";

    add_orange[indice].style.display= "inline-flex";
    
    final_cont.value = (Number(value_multi[0].value) + Number(value_multi[1].value)+ Number(value_multi[2].value)+ Number(value_multi[3].value)+ Number(value_multi[4].value)+ Number(value_multi[5].value)+ Number(value_multi[6].value)+ Number(value_multi[7].value)+ Number(value_multi[8].value)).toFixed(2)

    quanti_confirm[indice].value = quanti_output[indice].value

    multi_confirm[indice].value = value_multi[indice].value

    card_txt[indice].style.display= "block";
    card_confirm[indice].style.display= "flex"

    box_noItems.style.display = 'none'
    orders_local.style.display= 'block'

    final_confirm.value = final_cont.value
}

function add_Item(btn){
    let indice= btn.target.dataset.number
    let valor_item= btn.target.dataset.valor
    
    total_itens[indice].value = Number(total_itens[indice].value)+1

    cart_number.value = Number(cart_number.value)+1

    quanti_output[indice].value = Number(quanti_output[indice].value)+1
    
    mult_result = quanti_output[indice].value * valor_item
    
    value_multi[indice].value = mult_result.toFixed(2)

    final_cont.value = (Number(value_multi[0].value) + Number(value_multi[1].value)+ Number(value_multi[2].value)+ Number(value_multi[3].value)+ Number(value_multi[4].value)+ Number(value_multi[5].value)+ Number(value_multi[6].value)+ Number(value_multi[7].value)+ Number(value_multi[8].value)).toFixed(2)
    
    quanti_confirm[indice].value = quanti_output[indice].value

    multi_confirm[indice].value = value_multi[indice].value
    
    final_confirm.value = final_cont.value
    
}

function remove_Item(btn){
    let indice= btn.target.dataset.number
    let valor_item= btn.target.dataset.valor
    total_itens[indice].value = Number(total_itens[indice].value)-1
    
    cart_number.value = Number(cart_number.value)-1
    
    quanti_output[indice].value = Number(quanti_output[indice].value)-1

    mult_result = quanti_output[indice].value * valor_item
    
    value_multi[indice].value = mult_result.toFixed(2)

    final_cont.value = (Number(value_multi[0].value) + Number(value_multi[1].value)+ Number(value_multi[2].value)+ Number(value_multi[3].value)+ Number(value_multi[4].value)+ Number(value_multi[5].value)+ Number(value_multi[6].value)+ Number(value_multi[7].value)+ Number(value_multi[8].value)).toFixed(2)
    
    quanti_confirm[indice].value = quanti_output[indice].value

    multi_confirm[indice].value = value_multi[indice].value
    
    final_confirm.value = final_cont.value
    
    if (cart_number.value == 0 )
    {
        box_noItems.style.display = 'flex'
        orders_local.style.display= 'none'
    }
    if (total_itens[indice].value < 1 )
    {
        add_car[indice].style.display= "inline-flex";
        add_orange[indice].style.display= "none";
        quanti_output[indice].value = ""
        value_multi[indice].value = ""
        console.log(value_multi[indice].value)
        card_txt[indice].style.display= "none";
    }

}


add_car.forEach(function(btn){
    btn.addEventListener("click", car_btn)
})

add_btn.forEach(function(btn){
    btn.addEventListener("click", add_Item)
})

remove_btn.forEach(function(btn){
    btn.addEventListener("click", remove_Item)
})

function confirmCorder(){
    box_cart.style.display= "none";
    box_items.style.display= "none";
    box_confirm.style.display= "block";
}

exit_btn.addEventListener('click', function(){

    box_cart.style.display= "block";
    box_items.style.display= "block";
    box_confirm.style.display= "none";


})
new_Order.addEventListener('click', function(){
    
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thank you for your preference",
        showConfirmButton: false,
        timer: 1500
    });

    setInterval(() => {
        window.location.reload()
    }, 1503 );
})

