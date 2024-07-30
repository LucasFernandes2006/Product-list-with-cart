
const btn_white = document.querySelectorAll("div.btn_car")
const btn_orange = document.querySelectorAll("div.btn-orange")
const btn_increment = document.querySelectorAll("div.btn-quanti.increment")
const btn_decrement = document.querySelectorAll("div.btn-quanti.decrement")

const box_items = document.querySelector("div.div-items")
const box_cart = document.querySelector("div.added-box")
const box_confirm = document.querySelector("div.confirmed-order")

const btn_confirm_order = document.querySelector("div.btn-chosen")

const card_txt = document.querySelectorAll("div.order-text")
const card_confirm = document.querySelectorAll("div.confirm-item")
const box_noItems = document.querySelector("div.no_items")
const orders_local = document.querySelector("div.order-card")

let total_itens = document.querySelectorAll("output.num-itens")
let card_quanti = document.querySelector("output.quanti-items")
let quanti_output = document.querySelectorAll("output.item-quanti")
let value_multi = document.querySelectorAll("output.final-value")
let final_cont = document.querySelector("output.total-value")

let quanti_confirm = document.querySelectorAll("output.item-quanti-confirm")
let multi_confirm = document.querySelectorAll("output.final-value-confirm")
let final_confirm = document.querySelector("output.total-value-confirm")

const btn_remove_item = document.querySelectorAll("img.remone_item")

const exit_btn = document.querySelector("img.btn_exit")

const new_Order = document.querySelector("div.confirm-btn")

function add_number (i)
{   
    
    card_quanti.value = Number(card_quanti.value)+1
    total_itens[i].value = Number(total_itens[i].value)+1
    quanti_output[i].value = Number(quanti_output[i].value)+1
}

function reduce_number (i)
{
    total_itens[i].value = Number(total_itens[i].value)-1
    
    card_quanti.value = Number(card_quanti.value)-1
    
    quanti_output[i].value = Number(quanti_output[i].value)-1
}

function btn_defult_function(i, item_valor)
{
    mult_result = quanti_output[i].value * item_valor

    value_multi[i].value = mult_result.toFixed(2)

    final_cont.value = (Number(value_multi[0].value) + Number(value_multi[1].value)+ Number(value_multi[2].value)+ Number(value_multi[3].value)+ Number(value_multi[4].value)+ Number(value_multi[5].value)+ Number(value_multi[6].value)+ Number(value_multi[7].value)+ Number(value_multi[8].value)).toFixed(2)
    
    mult_result = quanti_output[i].value * item_valor

    quanti_confirm[i].value = quanti_output[i].value

    multi_confirm[i].value = value_multi[i].value
    
    final_confirm.value = final_cont.value
}

function car_btn (btn){
    let indice= btn.target.dataset.number
    
    let valor_item= btn.target.dataset.valor

    add_number(indice, valor_item)
    btn_defult_function(indice, valor_item)
    
    btn_white[indice].style.display= "none";

    btn_orange[indice].style.display= "inline-flex";

    card_txt[indice].style.display= "block";
    card_confirm[indice].style.display= "flex"

    box_noItems.style.display = 'none'
    orders_local.style.display= 'block'

    
}

function add_Item(btn){
    let indice= btn.target.dataset.number
    let valor_item= btn.target.dataset.valor
    
    add_number(indice)
    btn_defult_function(indice, valor_item)
    
}

function reduce_Item(btn){
    let indice= btn.target.dataset.number
    let valor_item= btn.target.dataset.valor

    reduce_number(indice, valor_item)
    btn_defult_function(indice, valor_item)
    
    if (card_quanti.value == 0 )
    {
        box_noItems.style.display = 'flex'
        orders_local.style.display= 'none'
    }
    if (total_itens[indice].value < 1 )
    {
        btn_white[indice].style.display= "inline-flex";
        btn_orange[indice].style.display= "none";
        quanti_output[indice].value = ""
        value_multi[indice].value = ""
        card_txt[indice].style.display= "none";
        card_confirm[indice].style.display = "none"
    }

}


function remove_Item(btn){
    let indice= btn.target.dataset.number
    let valor_item= btn.target.dataset.valor

    card_txt[indice].style.display= "none";
    btn_white[indice].style.display="inline-flex"
    btn_orange[indice].style.display="none"
    total_itens[indice].value = 0
    card_quanti.value = Number(card_quanti.value) - Number(quanti_output[indice].value)
    final_cont.value =  (Number(final_cont.value) - Number(value_multi[indice].value)).toFixed(2)
    final_confirm.value = final_cont.value
    quanti_output[indice].value = 0
    card_confirm[indice].style.display = "none"

    if (card_quanti.value == 0 )
    {
        box_noItems.style.display = 'flex'
        orders_local.style.display= 'none'
    }
}

btn_white.forEach(function(btn){
    btn.addEventListener("click", car_btn)
})

btn_increment.forEach(function(btn){
    btn.addEventListener("click", add_Item)
})

btn_decrement.forEach(function(btn){
    btn.addEventListener("click", reduce_Item)
})

btn_remove_item.forEach(function(btn){
    btn.addEventListener("click", remove_Item)
})

function confirmCorder(){
    
    if(window.innerWidth >= 994)
    {
        box_confirm.style.display= "block";
    }
    else{
        box_cart.style.display= "none";
        box_items.style.display= "none";
        box_confirm.style.display= "block";
    }
}

exit_btn.addEventListener('click', function(){

    box_cart.style.display= "block";
    box_items.style.display= "flex";
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

