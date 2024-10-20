import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url,)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll custom-scroll-none'>
        {
            categoryProduct.map((product, index)=>{
                return(
                    <Link to={"/product-category/" +product?.category } key={index}>
                        <div className='cursor-pointer w-20 h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                            <img src={product?.productImage[0]} alt="product img" className='h-full object-scale-down  mix-blend-multiply hover:scale-150 transition-all ' />
                        </div>
                        <p className='text-center uppercase'>{product.category}</p>

                    </Link>
                    
                )
            })
        }
        </div>
    </div>
  )
}

export default CategoryList