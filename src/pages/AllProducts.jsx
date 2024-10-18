import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

function AllProducts() {
  const [openUploadProduct, setopenuploadProduct] = useState(false)



  return (
    <>
    <div className='bg-white py-4 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg '>All Products</h2>
      <button onClick={()=>setopenuploadProduct(!openUploadProduct)} className='border-2 border-red-600 py-2 px-4 rounded-full hover:bg-red-600 hover:text-white transition-all '>Upload Product</button>
    </div>






    {
      openUploadProduct && (
        <UploadProduct onclose={()=>setopenuploadProduct(!openUploadProduct)} />
      )
    }
    

    </>
  )
}

export default AllProducts
