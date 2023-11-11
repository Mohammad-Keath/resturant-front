import React from 'react'

function ItemCard({item,setItemToCart}) {
  return (
    <div className='itemCard'>
        <img className='cardImg' src=''/>
        <h3 className='itemName'>{item.name}</h3>
        <p className='itemDescription'>{item.description}</p>
        <button className='itemSelection' onClick={()=>setItemToCart(item)}>Select this item</button>
    </div>
  )
}

export default ItemCard