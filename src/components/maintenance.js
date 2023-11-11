import React, { useEffect, useState } from 'react'
import { axiosHandler } from '../handlers/axiosHandler'
import {IoAdd} from 'react-icons/io5'


function Maintenance({addingMaintenance,setAddingMaintenance}) {
    const [maintenance,setMaintenance]=useState()

    async function getMaintenance(){
        try{
            const response = await axiosHandler('GET','/maintenance')
            if(response.status == 200){
                setMaintenance(response.data)
                console.log(response.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getMaintenance()
    },[addingMaintenance])
  return (
    <div>
    <div className='maintenancePage'>
        <IoAdd onClick={()=>{setAddingMaintenance(true)}} className='AddMaintenanceIcon'/>
        <h2 className='MaintenanceTitle'>Maintenance</h2>
        <table className='maintenanceTable'>
            <tr>
                <th className='tabelCell'>Date</th>
                <th className='tabelCell'>Impact on the Restaurant</th>
                <th className='tabelCell'>Quota/Price of the maintenance</th>
                <th className='tabelCell'>Comments</th>
            </tr>
            <tr>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
            </tr>
            <tr>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
            </tr>
            <tr>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
                <td className='tabelCell'></td>
            </tr>
            {maintenance?.map((maintenance)=>{
                return(
                <tr>
                    <td className='tabelCell'>{maintenance.date}</td>
                    <td className='tabelCell'>{maintenance.impact_of_resturant}</td>
                    <td className='tabelCell'>{maintenance.price}</td>
                    <td className='tabelCell'>{maintenance.comment}</td>
                </tr>
                )
            })}
        </table>

    </div>
    </div>
  )
}

export default Maintenance