import { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

export default function useAppHooks(){
    const [hiddenMap, setHiddenMap] = useState<Record<string, boolean>>({});
    const [hiddenNoItems, setHiddenNoItems] = useState<boolean>();
    const [showConfirmItems, setShowConfirmItems] = useState<boolean>();
    const [individualQuantity, setIndividualQuantity] = useState<Record<string, number>>({});
    const [individualTotal, setIndividualTotal] = useState<Record<string, number>>({});
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [showConfirmedOrder, setShowConfirmedOrder] = useState(false);
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

        function moveHandleDesserts(){
            navigate('/handleDesserts');
        }
        
        useEffect(() => {
        Object.entries(individualQuantity).forEach(([id, qty]) => {
            const itemPrice = prices[id] ?? 0; // ajuste para sua lógica de preço
            
            setIndividualTotal(prev => ({
                ...prev,
                [id]: itemPrice * qty
            }));
            
            if (qty > 0 ){
                setHiddenMap(prev => (
                    { ...prev, [id]: true }   
                )) 
            }
            else{
                  setHiddenMap(prev => (
                    { ...prev, [id]: false }   
                ))              
            }
            
            if (totalQuantity > 0 ){
                setHiddenNoItems( (prev) => prev = true )
            }
            else{
                setHiddenNoItems( (prev) => prev = false )
            }
        });
    }, [individualQuantity,prices]);
    
   

    function addCarFunction(id:string, price:number){
        
        setIndividualQuantity(prev => 
        {
            const newQty = prev[id] === undefined || 1 ? 1 : 0
            return {...prev, [id]: newQty } 
            
        });  
        
        setPrices(prev => ({
            ...prev,
            [id]: price // armazena o preço recebido
        }));
    }

    function incrementFunction(id:string){
        setIndividualQuantity( prev=>(
            {...prev, [id]:(prev[id] ?? 0) +1}
        ))
    }

        function decrementFunction(id:string){
        setIndividualQuantity( prev=>(
            {...prev, [id]:(prev[id] ?? 0) - 1}  
        ))
    }

    function removeItem(id:string){
        setHiddenMap(prev => (
            { ...prev, [id]: false }   
        ))

        setIndividualQuantity(prev =>(
            { ...prev, [id]: 0 } 
        ))

    }
    function isHidden(id: string){
        
        return !!hiddenMap[id];    
    }

    function isShow(id: string){
        
        return !!hiddenMap[id];  
          
        
    }

    function isHiddenNoItems(){
        
        return !!hiddenNoItems;    
    }

    function formatPrice(value: number): string {
        return value.toFixed(2).replace(".", ",");
    }
    function showIndividualTotal(id:string){
        return formatPrice(individualTotal[id] ?? 0);
    }

    function getQuantity (id:string){
        return individualQuantity[id] ?? 0;
    }

    function showConfirm(){
        setShowConfirmedOrder(true)
        setShowConfirmItems((prev) => prev = true)
        
    }
    function hiddenConfirm(){
        setShowConfirmedOrder(false)
        setShowConfirmItems((prev) => prev = false)

    }

    function visibleConfirm(){
        return !!showConfirmItems;
    }

    const totalQuantity = Object.values(individualQuantity).reduce((sum, qty) => sum + qty, 0);
    const toltalValue = Object.values(individualTotal).reduce((sum, qty) => sum + qty, 0)
    
    function AlertSweet(){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for your preference",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'swal-custom-z'
            }
        });

        setInterval(() => {
            window.location.reload()
        }, 1503 );
    }
return{
    addCarFunction,
    isHidden,
    isShow,
    getQuantity,
    incrementFunction, 
    decrementFunction,
    totalQuantity,
    showIndividualTotal,
    toltalValue,
    isHiddenNoItems,
    removeItem,
    showConfirm,
    visibleConfirm,
    hiddenConfirm,
    AlertSweet,
    loginUser,
    showConfirmedOrder,
    logoutUser,
    moveHandleDesserts
}
}



