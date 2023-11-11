import Cookies from 'js-cookie'
import React from 'react'


function Header({options,setCategorySelected,categorySelected}) {
  
  return (
    <div>
        <div className='headerTitle'>
            <h1 className='title'>Restaurant Name</h1>
            {!Cookies.get('user_info')&&<a className='signin' href='/auth'>Signin</a>}
        </div>
        <div className='headerNav'>
            {options.map((item,idx)=>{
              return <p key={idx} onClick={()=>{setCategorySelected(item)}} className={`navOption ${item == categorySelected ? 'selected':''}`}>{item}</p>
            })}
        </div>
    </div>
  )
}

export default Header