import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SummaryApi from '../common';
import Context from '../context';
import addToCart from '../helpers/addToCart';
const SearchProduct = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('q');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        try {
          setLoading(true)

            const url = `${SummaryApi.searchProduct.url}?q=${encodeURIComponent(query)}`;
            const response = await fetch(url, {
                method: SummaryApi.searchProduct.method,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setLoading(false)
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const dataResponse = await response.json();
            setData(dataResponse.data || []); // assuming `data` contains the product list
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

  useEffect(()=>{
    fetchProduct()
  },[query])

  const {countAddToCartProduct} = useContext(Context)
  const handleAddToCart = async(e, id) =>{
    await addToCart(e,id),
    await countAddToCartProduct()
  }



  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center  '>Loading...</p>
        )
      }
      <p className='text-lg font-semibold my-2 '>Search Results : {data.length}</p>
      {
        data.length === 0 && !loading &&(
          <p className='bg-white text-lg text-center p-4 '>No Data found...</p>
        )
      }
      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-2 justify-center md:justify-between  md:gap-4 overflow-scroll custom-scroll-none transition-all'>
    
    {
      data.map((product, index)=>{
        return(
          
          <Link to={"/product/"+product?._id} key={index} className='bg-white w-full min-w-[250px] md:min-w-[250px] max-w-[280px] md:max-w-[300px]  rounded-sm shadow '>
          <div className=' min-w-[120px] md:min-w-[145px] h-48 p-4 bg-slate-200 flex justify-center items-center '>
              <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 mix-blend- transition-all '/>
          </div>
          <div className='p-4 grid gap-3'>
            <h2 className='capitalize font-medium text-base md:text-lg text-ellipsis line-clamp-1 '>{product.productName}</h2>
            <p className='capitalize text-slate-500 '>{product.category}</p>
            <div className='flex justify-between items-center '>
                 <p className='line-through'>{product?.price}</p>
                 <p className='text-red-500 font-bold'>{product?.sellingPrice}</p>
            </div>

          <button className='bg-red-500 px-2 py-1 rounded-full hover:bg-red-700 text-white' onClick={(e)=>handleAddToCart(e, product?._id)}  >Add To Cart</button>
          </div>
         </Link>


        )
      })
    }
     </div>
    </div>
  )
}

export default SearchProduct