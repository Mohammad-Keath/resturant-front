import React, { useState } from 'react'
import {IoAdd} from 'react-icons/io5'
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from '../handlers/axiosHandler'
import showToastify from '../handlers/Toastify'
import Cookies from 'js-cookie'


function AddToCart({itemToCart,setItemToCart}) {
    const [itemData,setItemData]=useState({})
    async function submitHandler(e){
        e.preventDefault()
        document.getElementById("addForm").reset();
        const {id} = JSON.parse(Cookies.get('user_info'))
        try{
            // console.log(JSON.stringify({...itemData,userId:id,itemId:itemToCart.id}));
            const response = await axiosHandler('POST','/cart_item',{...itemData,userId:id,itemId:itemToCart.id})
            if(response.status != 200){
                showToastify("error")
            }else{
                showToastify("added")
                setItemToCart()
            }
        }
        catch(e){
            console.log(e)
            showToastify('error','does not added')
        }
    }

    function changeHandler(e){
        const {name , value}= e.target
        setItemData({...itemData,[name]:value})
    }
    showToastify('added')
  return (
    <>
      <div className='modelBlur'></div>
      {Cookies.get("user_info")&&<div className='model'>
        <AiOutlineClose onClick={()=>{setItemToCart()}} className='closeButton'/>
        <h2 className='modelHeader'>Add {itemToCart.name} To Cart</h2>
        <form id='addForm' onSubmit={submitHandler} className='addForm'>
            <label className='modelLabel'>quantity</label>
            <input onChange={changeHandler} className='modelInput' type='number' name='quantity'/>
            <label className='modelLabel'>time</label>
            <input onChange={changeHandler} className='modelInput' type='time' name='time'/>
            <label className='modelLabel'>note</label>
            <textarea onChange={changeHandler} className='modelTextArea' name='note'/>
            <button type='submit' className='modelButton'><IoAdd/></button>
        </form>
      </div>}
      {!Cookies.get("user_info")&&<div className='model'>
          <AiOutlineClose onClick={()=>{setItemToCart()}} className='closeButton'/>
          <h3 className='noCookies'>Please <a className='linkToAuth' href='/auth'>signin</a> to show this feature</h3>
        </div>}
    </>
  )
}

export default AddToCart