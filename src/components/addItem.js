import React, { useState } from 'react'
import {IoAdd} from 'react-icons/io5'
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from '../handlers/axiosHandler'
import showToastify from '../handlers/Toastify'
import Cookies from 'js-cookie'


function AddItem({getData,setAdding}) {
    const [itemData,setItemData]=useState({})
    async function submitHandler(e){
        e.preventDefault()
        document.getElementById("addForm").reset();
        try{
            const response = await axiosHandler('POST','/item',itemData)
            if(response.status != 200){
                showToastify("error")
            }else{
                showToastify("added")
                getData()
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
      <div className='model'>
        <AiOutlineClose onClick={()=>{setAdding(false)}} className='closeButton'/>
        <h2 className='modelHeader'>Add Item</h2>
        <form id='addForm' onSubmit={submitHandler} className='addForm'>
            <label className='modelLabel'>Name</label>
            <input onChange={changeHandler} className='modelInput' name='name'/>
            <label className='modelLabel'>Category</label>
            <input onChange={changeHandler} className='modelInput' name='category'/>
            <label className='modelLabel'>Image</label>
            <input onChange={changeHandler} className='modelInput' name='image'/>
            <label className='modelLabel'>Description</label>
            <textarea onChange={changeHandler} className='modelTextArea' name='description'/>
            <button type='submit' className='modelButton'><IoAdd/></button>
        </form>
      </div>
      
    </>
  )
}

export default AddItem