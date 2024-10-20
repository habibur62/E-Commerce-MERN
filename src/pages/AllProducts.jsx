import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import moment from 'moment'
import { CiEdit } from "react-icons/ci";
import EditProduct from '../components/EditProduct';

function AllProducts() {
  const [openUploadProduct, setopenuploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [editProductItem , setEditProductItem] = useState('')

  const fetchAllProduct = async () =>{
      try {
        const fetchProduct = await fetch(SummaryApi.allProducts.url,{
          method : SummaryApi.allProducts.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
        })

        const productResponse = await fetchProduct.json()

        if(productResponse.success){
          setAllProduct(productResponse.data)
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <>
    <div className=' bg-white py-4 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg '>All Products</h2>
      <button onClick={()=>setopenuploadProduct(!openUploadProduct)} className='border-2 border-red-600 py-2 px-4 rounded-full hover:bg-red-600 hover:text-white transition-all '>Upload Product</button>
    </div>
    
    <table className='w-full userTable'>
        <thead>
          <tr>
          <th>Sr.</th>
          <th>Name</th>
          <th>Price</th>
          <th>Selling Price</th>
          <th>Brand Name</th>
          <th>Category</th>
          <th>Product Pic</th>
          <th>Upload Date</th>
          <th>Description</th>
          <th>Action</th>
          </tr>


        </thead>
        <tbody>
        {
          allProduct&&
          allProduct.map((product, index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.sellingPrice}</td>
                <td>{product.brandName}</td>
                <td>{product.category}</td>
                <td className='flex justify-center item-center '><img src={product.productImage[0]} className='w-10 h-10 rounded '></img></td>
                <td>{moment(product.createdAtmoment).format('LL')}</td>
                <td>{product.description}</td>

                <td><button  onClick={()=>{
                  setOpenEditProduct(!openEditProduct)
                  setEditProductItem(product)
                }}  
                className='bg-green-300 p-2 rounded-full hover:bg-green-400 hover:text-white'>
                    <CiEdit />
                  </button>

                  </td>
                
              </tr>
            )
          })
        }
        </tbody>
      </table>
      


    {
      openUploadProduct && (
        <UploadProduct onclose={()=>setopenuploadProduct(!openUploadProduct)} callProducts={fetchAllProduct()} />
      )
    }
    {
      openEditProduct &&(
        <EditProduct editProduct={editProductItem} closeEdti={()=>setOpenEditProduct(!openEditProduct)} callProduct={fetchAllProduct()} />
    )
    }
   

    </>
  )
}

export default AllProducts
