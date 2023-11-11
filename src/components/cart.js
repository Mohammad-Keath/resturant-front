import React, { useEffect, useState } from 'react'
import {IoAdd} from 'react-icons/io5'
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from '../handlers/axiosHandler'
import showToastify from '../handlers/Toastify'
import Cookies from 'js-cookie'


function Cart() {
    const [cartData,setCartData]=useState()

    const {id} = JSON.parse(Cookies.get('user_info'))

    async function submitHandler(e){
        e.preventDefault()
        try{
            const response = await axiosHandler('POST','/item')
            if(response.status != 200){
                showToastify("error")
            }else{
                showToastify("added")
            }
        }
        catch(e){
            showToastify('error','does not added')
        }
    }

    function changeHandler(e){
        const {name , value}= e.target
        ({[name]:value})
    }

    async function getCartItems (){
        try{

            const response = await axiosHandler('GET',`/cart_items/${id}`)
            if(response.status != 200){
                showToastify('error')
            }else{
                setCartData(response.data.items)
            }
        }
        catch(e){
            showToastify('error')
        }
    }
    useEffect(()=>{
        getCartItems()
    },[])
  return (
    <>
      <div className='cart'>
        <h3 className='cartTitle'>{cartData?.length} Cart Items</h3>
        {cartData?.map((item,idx)=>{
            return(<div className='cartItems' key={idx}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.cart_items.quantity}</p>
                <p>Time: {item.cart_items.time}</p>
                <p>Note: {item.cart_items.note}</p>
                <br/>

            </div>)
        })}
      </div>
    </>
  )
}

export default Cart