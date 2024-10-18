import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdOutlineDeleteOutline } from "react-icons/md";


export default function UploadProduct({onclose}) {
    const [data, setData] = useState({
        productName : '',
        brandName : '',
        category : '',
        productImage : [],
        description : '',
        price: '',
        sellingPrice : ''
    })
    const [fullScreenImage, setFullScreenImage] = useState("")
   const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

   console.log("data",  data)


    const handleOnChange = (e) =>{
        const {name, value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUpoadimage = async(e) =>{
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)

        setData((preve)=>{
            return{
                ...preve,
                productImage: [ ...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteImage = async(e) =>{
        const newProductImage = [...data.productImage]
        newProductImage.splice(e, 1);

        setData((preve)=>{
            return{
                ...preve,
                productImage: [ ...newProductImage ]
            }
        })

    }

    const handleUploadProduct = (e) =>{
        e.preventDefault()
    }


  return (
    <div className='bg-slate-100 bg-opacity-60 fixed flex justify-center items-center top-0 left-0 w-full h-full '>
        <div className='bg-white p-5 rounded w-full max-w-2xl h-full max-h-[70%] overflow-scroll'>
            <div className="flex justify-between items-center ">
                <h2 className='font-bold text-xl'>Upload Product</h2>
                <IoMdClose  onClick={()=>{onclose()} } className='cursor-pointer text-xl hover:text-red-500'/>
            </div>
            
        <form className='grid' onSubmit={handleUploadProduct}>
            <label htmlFor="productName">Product Name : </label>
            <input type="text" id='productName'name='productName' placeholder='Enter product name...' value={data.productName} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="brandName">Brand Name : </label>
            <input type="text" id='brandName' name='brandName' placeholder='Enter product brand...' value={data.brandName} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="category">Category Name : </label>
            <select id='category' name='category' value={data.category} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            >
                <option value="" >Select Category </option>

                {
                    productCategory.map((category, index)=>{
                        return(
                            <option value={category.value} key={index}>{category.value} </option>
                        )
                    })
                }
            </select>
            <label htmlFor="description">Description : </label>
            <textarea rows={3}  type="text" id='description' name='description' placeholder='Enter product Description...' value={data.description} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="price">Price : </label>
            <input type="number" id='price' name='price' placeholder='Enter product Price...' value={data.price} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="sellingPrice">Selling Price : </label>
            <input type="number" id='sellingPrice' name='sellingPrice' placeholder='Enter product selling Price...' value={data.sellingPrice} onChange={handleOnChange}
            className='bg-slate-200 p-2 rounded border '
            />
            <label htmlFor="productImage">Product Image : </label>
                <div className='flex justify-between items-center my-8'>
                <label htmlFor="uploadImageInput">
                <div className='p-2 bg-red-100 rounded h-22 w-22 cursor-pointer flex-col flex justify-center items-center '>
                        <span className='text-4xl'><FaCloudUploadAlt /> </span>
                        <p>Upload Product Image</p>
                        <input type="file" id='uploadImageInput' className='hidden ' onChange={handleUpoadimage}/>
                    
                </div>
                </label>

                <div className='flex justify-between items-center gap-2 '>
                    {
                        data?.productImage[0] &&
                        data.productImage.map((image, index)=>{
                            return(
                                <div key={index} className='relative group'> 
                                <img src={image}  className='w-20 h-20 gap-2  cursor-pointer'
                                 onClick={ ()=>{
                                    setFullScreenImage(image)
                                  setOpenFullScreenImage(true)
                                 }
                                    
                                 }/>
                                 <div onClick={()=>handleDeleteImage(index)} className='absolute group-hover:block hidden bottom-0 right-0 text-white cursor-pointer  bg-red-600 p-1 rounded-full ' >
                                    <MdOutlineDeleteOutline />                                   

                                 </div>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
                <button className='bg-red-500 rounded-full '>Upolad Product</button>
        </form>

        </div>
        {/***display product */}
        {
             openFullScreenImage&&
            <DisplayImage imgUrl={fullScreenImage} onClose={()=>{setOpenFullScreenImage(false)}} />
        }
        

    </div>
  )
}
