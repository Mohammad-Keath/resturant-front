import React, { useState } from 'react'
import {IoAdd} from 'react-icons/io5'
import {AiOutlineClose} from 'react-icons/ai'
import { axiosHandler } from '../handlers/axiosHandler'
import showToastify from '../handlers/Toastify'
import Cookies from 'js-cookie'


function AddMaintenance({setAdding}) {
    const [itemData,setItemData]=useState({})
    async function submitHandler(e){
        e.preventDefault()
        try{
            const response = await axiosHandler('POST','/maintenance',itemData)
            if(response.status != 200){
                showToastify("error")
            }else{
                showToastify("added")
                document.getElementById("addForm").reset();
                setAdding(false)
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
        <AiOutlineClose onClick={()=>{setAdding(false)}} className='closeButton'/>
        <h2 className='modelHeader'>Add Maintenance Detail</h2>
        <form id='addForm' onSubmit={submitHandler} className='addForm'>
            <label className='modelLabel'>Date</label>
            <input onChange={changeHandler} className='modelInput' type='date' name='date'/>
            <label className='modelLabel'>Impact on the Restaurant </label>
            <select onChange={changeHandler} className='modelInput' name='impact_of_resturant'>
                <option value="Complete shutdown">Complete shutdown</option>
                <option value="Partial shutdown">Partial shutdown</option>
                <option value="Normal operation">Normal operation</option>
            </select>
            <label className='modelLabel'>Quota/Price of the maintenance</label>
            <input onChange={changeHandler} className='modelInput' type='number' name='price'/>
            <label className='modelLabel'>Comments</label>
            <textarea onChange={changeHandler} className='modelTextArea' name='comment'/>
            <button type='submit' className='modelButton'><IoAdd/></button>
        </form>
      </div>}
      {!Cookies.get("user_info")&&<div className='model'>
          <AiOutlineClose onClick={()=>{setAdding()}} className='closeButton'/>
          <h3 className='noCookies'>Please <a className='linkToAuth' href='/auth'>signin</a> to show this feature</h3>
        </div>}
    </>
  )
}

export default AddMaintenance