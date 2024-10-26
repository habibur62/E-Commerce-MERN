import { useParams } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
export default function CategoryProduct() {
  const params = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(13).fill(null)

  const fetchData = async () =>{
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(params.categoryName)

    setLoading(false) 
    setData(categoryProduct?.data);
    setAllData(categoryProduct?.data);
  }

  useEffect(()=>{
    fetchData()
  },[])


  const [sortOrder, setSortOrder] = useState('');

  const handleOnCharngeSort = (e) =>{
    const value = e.target.value
    setSortOrder(value)

    if(value === 'asc'){
      setData(prev=> [...prev].sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value === 'dsc'){
      setData(prev=> [...prev].sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }






  const [allData, setAllData] = useState([]); // For original data
  const [selectedBrands, setSelectedBrands] = useState([]); // Track selected brands


const uniqueBrands = [...new Set(allData.map(product => product.brandName))];

  

const toggleBrand = (brand) => {
  // Check if the brand is already selected
  if (selectedBrands.includes(brand)) {
    // Unselect it by removing from selectedBrands array
    const updatedBrands = selectedBrands.filter(b => b !== brand);
    setSelectedBrands(updatedBrands);
    
    // If no brands are selected, show all data
    if (updatedBrands.length === 0) {
      setData(allData);
    } else {
      setData(allData.filter(product => updatedBrands.includes(product.brandName)));
    }
  } else {
    // Add brand to selectedBrands array
    const updatedBrands = [...selectedBrands, brand];
    setSelectedBrands(updatedBrands); 
    
    // Filter data based on selected brands
    setData(allData.filter(product => updatedBrands.includes(product.brandName)));
  }
};

  //add to cart count
  const {countAddToCartProduct} = useContext(Context)
  const handleAddToCart = async(e, id) =>{
    await addToCart(e,id),
    await countAddToCartProduct()
  }

  return (
    <div className='container mx-auto  p-2 '>
      {/*desktop version*/}
        <div className=' lg:grid grid-cols-[200px,1fr] '>
            {/*left side*/}
            <div className='bg-white p-2 min-h-[calc(95vh-110px)] gap-6'>
              <div>
                <h3 className='text-base uppercase fonst-medium  text-slate-500 border-b '>Sort By Price</h3>
                <form className='text-sm flex flex-col gap-2 py-2 '> 
                  <div className='flex items-center gap-3 '>
                    <input type="radio" name='sort' checked={sortOrder === 'asc'} value={"asc"} onChange={handleOnCharngeSort}  className='cursor-pointer '/>
                    <label> Low to High</label>
                  </div> 
                  <div  className='flex items-center gap-3 '>
                    <input type="radio" name='sort'checked={sortOrder === 'dsc'}  value={"dsc"} onChange={handleOnCharngeSort}  className='cursor-pointer '/>
                    <label> High to Low</label>
                  </div>
                </form>
              </div>

              <div>
                <h3 className='text-base uppercase fonst-medium  text-slate-500 border-b '>Brand</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                <input
                  type="checkbox"
                  checked={selectedBrands.length === 0} // Check when no brands are selected
                  onChange={() => {
                  setSelectedBrands([]);
                  setData(allData); // Show all data when "All" is selected
                  }}
                  className='cursor-pointer'
                />
                <label>All</label>
              </div>
    {
      uniqueBrands.map((brand, index) => (
        <div key={index} className='flex items-center gap-3'>
          <input 
            type="checkbox" 
            name="brand" 
            value={brand} 
            checked={selectedBrands.includes(brand)}
            onChange={() => toggleBrand(brand)}
            className='cursor-pointer' 
          />
          <label>{brand}</label>
        </div>
      ))
    }
  </form>
              </div>
            </div>


            {/*right side*/}
          <div>
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

            </div>
        </div>
    </div>
  )
}
