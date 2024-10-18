import React from 'react'
import { IoMdClose } from "react-icons/io";

export default function DisplayImage({onClose, imgUrl}) {
    
  return (
    <div className='fixed bg-slate-200 bg-opacity-70  w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center '>
        <div className='bg-white p-2 shadow-lg rounded w-full max-w-[60vh] h-full max-h-[60vh] mx-auto '>
            <div className="flex justify-end ">
                 <IoMdClose  onClick={()=>{onClose()} } className='cursor-pointer text-2xl font-bold hover:text-red-500'/>
            </div>
            <div className='flex justify-center items-center p-2 w-full h-full ' >
              <img src={imgUrl} className='w-fit h-fit ' />
            </div>
        </div>
    </div>
  )
}
