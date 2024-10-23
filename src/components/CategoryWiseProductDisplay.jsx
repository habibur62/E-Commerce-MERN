import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'

const CategoryWiseProductDisplay = ({category, heading}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(13).fill(null)

  const fetchData = async () =>{
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)

    setLoading(false)
    setData(categoryProduct?.data);

  }
  useEffect(()=>{
    fetchData()
  },[])



  return (
    <div className='container mx-auto py-6  relative '>
      <h1 className='text-2xl font-semibold py-2 '>{heading}</h1>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-4 justify-between  md:gap-6 overflow-scroll custom-scroll-none transition-all'>
    
      {
        data.map((product, index)=>{
          return(
            
            <Link to={"product/"+product?._id} key={index} className='bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  rounded-sm shadow-md '>
            <div className=' min-w-[120px] md:min-w-[145px] h-48 p-4 bg-slate-200 flex justify-center items-center '>
                <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 mix-blend-multiply '/>
            </div>
            <div className='p-4 grid gap-3'>
              <h2 className='capitalize font-medium text-base md:text-lg text-ellipsis line-clamp-1 '>{product.productName}</h2>
              <p className='capitalize text-slate-500 '>{product.category}</p>
              <div className='flex justify-between items-center '>
                   <p className='line-through'>{product?.price}</p>
                   <p className='text-red-500 font-bold'>{product?.sellingPrice}</p>
              </div>

            <button className='bg-red-500 px-2 py-1 rounded-full hover:bg-red-700 text-white'onClick={(e)=>addToCart(e,product?._id)} >Add To Cart</button>
            </div>
           </Link>


          )
        })
      }
       </div>
      



    </div>
  )
}

export default CategoryWiseProductDisplay
