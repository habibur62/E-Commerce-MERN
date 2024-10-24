import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { MdDelete } from "react-icons/md";

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchCartProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.viewAddToCartProduct.url,{
            method: SummaryApi.viewAddToCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            }
        })
        setLoading(false)


        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    useEffect(()=>{
        fetchCartProduct()
    },[context.cartProductCount])


    const increaseQty = async(id, qty) =>{

        const response = await fetch(SummaryApi.updateAddToCartProduct.url,{
            method: SummaryApi.updateAddToCartProduct.method,
            credentials: 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {   productId: id, 
                    quantity : qty+1
                }
            )
        })
        const responseData = await response.json()
        if(responseData.success){
            setData((prevData) => 
                prevData.map((product) => 
                    product.productId._id === id 
                    ? { ...product, quantity: product.quantity + 1 } 
                    : product
                )
            );
        }
    }
   

    const decreaseQty = async(id, qty) =>{
        if(qty>=2){
            const response = await fetch(SummaryApi.updateAddToCartProduct.url,{
                method: SummaryApi.updateAddToCartProduct.method,
                credentials: 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(
                    {
                        productId: id, 
                        quantity : qty-1
                    }
                )
            })
            const responseData = await response.json()
            if(responseData.success){
                setData((prevData) => 
                    prevData.map((product) => 
                        product.productId._id === id 
                        ? { ...product, quantity: product.quantity-1 } 
                        : product
                    )
                );
            }
        }
    }

    const deleteCartProduct = async(id) =>{
        const response = await fetch(SummaryApi.deleteAddToCartProduct.url,{
            method: SummaryApi.deleteAddToCartProduct.method,
            credentials: 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {   productId: id, 
                }
            )
        })
         // Check if the response is okay (status 200-299)
         if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        if (response.status === 204) {
            console.log("Product deleted successfully, but no content returned.");
            setData(prevData => prevData.filter(product => product.productId._id !== id));
            return; // Exit the function since there's no JSON to parse
        }
        const responseData = await response.json();

        if (responseData.success) {
            // Update the state directly instead of calling fetchCartProduct
            setData(prevData => prevData.filter(product => product.productId._id !== id));
        }else {
            console.error(responseData.message); // Log the error message from the response
        }
    }



  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-20'>
        {
            data.length === 0 && !loading &&(
            <h2 className='text-2xl font-bold'>No Product Added</h2>
            )
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-20 lg:justify-between '>
            <div className='w-full max-w-3xl '>
                {
                    loading ? (
                        loadingCart.map((_, index)=>{
                            return(
                                <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse '>
                                </div>
                            )
                        })
                        
                    ) : (
                        data.map((product, index)=>{
                            return(
                                <div key={index} className='relative w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-3 gap-2 '>
                                    <div className='w-32 h-32 bg-slate-200 flex justify-center items-center '>
                                        <img src={product?.productId?.productImage[0]} className='w-ful h-full p-2 object-scale-down mix-blend-multiply' />
                                    </div>
                                    <div onClick={()=>{  deleteCartProduct(product?.productId?._id)}} className='text-red-500 right-0 top-0 absolute p-2 hover:bg-red-500 rounded-full hover:text-white cursor-pointer ' >
                                        <MdDelete  />
                                    </div>
                                    <div>
                                        
                                        <h2 className='capitalize text-2xl line-clamp-1 '>{product?.productId?.productName}</h2>
                                        <p>{product?.productId?.category}</p>
                                        <p className='text-red-500 font-bold '>{product?.productId?.sellingPrice}</p>
                                        <div className='flex items-center gap-2 '>
                                            <button onClick={()=>decreaseQty(product?.productId?._id, product?.quantity)} className='px-2 border-2 border-slate-300 font-bold text-2xl hover:bg-red-400 transition-all '>-</button>
                                            <p>{product?.quantity}</p>
                                            <button onClick={()=>{  increaseQty(product?.productId?._id, product?.quantity)}} className='px-2 border-2 border-slate-300 font-bold text-2xl hover:bg-red-400 transition-all '>+</button>
                                        </div>
                                    </div>
                                    <div className='text-left'>
                                        <p className='text-red-500 text-xl '>
                                            Total: {product?.quantity * product?.productId?.sellingPrice}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            {
                loading ? (
                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse '>
                        
                    </div>
                ) : (
                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse '>
                        total
                    </div>
                )
            }
             </div>
        </div>
    </div>
  )
}

export default Cart
