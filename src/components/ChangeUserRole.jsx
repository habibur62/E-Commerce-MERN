import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import {toast} from 'react-toastify'



export default function ChangeUserRole({name, email, role, onClose, userId, callUsers}) {
  const [ userRole, setUserRoll ] = useState(role)

  const handleOnChangeSelect = (e) =>{
    setUserRoll(e.target.value)
  } 

  const handleChange = async () =>{
      
      try {
          const dataResponse= await fetch(SummaryApi.updateUser.url, {
              method: SummaryApi.updateUser.method,
              credentials: 'include', 
              headers: {
                  "content-type" : "application/json"
              },
              body : JSON.stringify( {userId ,role:userRole})
          })

          const dataApi = await dataResponse.json()

          if(dataApi.success){
              toast.success(dataApi.message)
              onClose()
              callUsers
          }
          if(dataApi.error){
              toast.error(dataApi.message)
          }
      } catch (error) {
            console.error("Error fetching data:", error);
      }
  }

  return (
    <div className='flex justify-center items-cente w-full h-full top-0 bottom-0 left-0 right-0 z-10 fixed bg-slate-200 bg-opacity-30 '>
        <div className='bg-white m-auto shadow-md p-4 w-full h-80 max-w-sm '>
            <button className='block ml-auto' onClick={onClose}>
            <IoCloseSharp />
            </button>
            <h2 className='text-xl font-bold text-center p-4 '>Change User Roll</h2>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <div className='flex justify-between items-center  '>
                <p>Role: </p>
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                {
                  Object.values(ROLE).map((item, index)=>{
                    return(
                      <option value={item} key={index}>{item}</option>
                    )
                  })
                }
              </select>
              </div>
            
                <button onClick={handleChange} className='w-fit mx-auto mt-4 bg-red-500 rounded px-4 py-1 text-white  hover:bg-slate-700 block '>Change Role</button>

        </div>
    </div>
  )
}
