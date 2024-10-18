import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';

export default function UploadProduct({onclose}) {
    const [data, setData] = useState({
        productName : '',
        brandName : '',
        category : '',
        productImage : '',
        description : '',
        price: '',
        selling : ''
    })

    const handleOnChange = (e) =>{
        e.preventDefault()
        console.log(e.target.value)
    }




  return (
    <div className='bg-slate-100 bg-opacity-60 fixed flex justify-center items-center top-0 left-0 w-full h-full '>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[50%] '>
            <div className="flex justify-between items-center ">
                <h2 className='font-bold text-xl'>Upload Product</h2>
                <IoMdClose  onClick={()=>{onclose()} } className='cursor-pointer text-xl hover:text-red-500'/>
            </div>
            
        <form className='grid'>
            <label htmlFor="productName">Product Name : </label>
            <input type="text" id='productName' placeholder='Enter product name...' value={data.productName} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="brandName">Brand Name : </label>
            <input type="text" id='brandName' placeholder='Enter product brand...' value={data.brandName} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="category">Category Name : </label>
            <select id='category' value={data.category} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            >
                {
                    productCategory.map((category, index)=>{
                        return(
                            <option value={category.value} key={index}>{category.lavel} </option>
                        )
                    })
                }
            </select>
            <label htmlFor="description">Description : </label>
            <input type="text" id='description' placeholder='Enter product Description...' value={data.description} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="price">Price : </label>
            <input type="number" id='price' placeholder='Enter product Price...' value={data.price} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
        </form>









        </div>
    </div>
  )
}
