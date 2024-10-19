import React from 'react'
import { IoIosNavigate, IoMdClose } from "react-icons/io";


export default function EditProduct({onClose}) {









  return (
    <div className='fixed w-full max-w-[100vh] h-full max-h-[100vh] bottom-0 top-0 left-0 right-0 bg-red-500 flex justify-center items-center '>
        <div className='bg-white w-full max-w-[50vh] h-full max-h-[50vh]'>
            <div className='flex justify-between items-center p-4'>
                 <h2 className='text-2xl font-bold  '>Edit Product</h2>
                 <IoMdClose onClick={()=>onClose()} className='text-2xl font-bold hover:text-red-700 cursor-pointer  '/>
            </div>
            <form >

            </form>
        </div>
    </div>
  )
}
