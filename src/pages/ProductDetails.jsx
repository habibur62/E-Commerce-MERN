import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalf } from "react-icons/fa";

export default function ProductDetails() {

    const [data, setData] = useState({
        
            productName : '',
            brandName : '',
            category : '',
            productImage : [],
            description : '',
            price: '',
            sellingPrice : ''
    })

    const param = useParams()
    const [loading, setLoading] = useState(false)
    const productImageListLoadin = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState('')
    const [ zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x : 0,
        y : 0
    })
    const[zoomImage, setZoomImage] =useState(false)


    const fetchProductDetails = async() =>{
        setLoading(true)

        const response = await fetch(SummaryApi.productDetails.url,{
            method: SummaryApi.productDetails.method,
            headers:{
                "content-type" : "application/json" 
            },
            body: JSON.stringify({
                productId : param?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()

        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImage[0])

    }

    useEffect(()=>{
        fetchProductDetails()
    },[])

    const handleMouseInterProduct = (imgUrl) =>{
        setActiveImage(imgUrl)

    }

    const handleZoomImage = (e) =>{
        setZoomImage(true)
        const {left, top, width, height } = e.target.getBoundingClientRect()

        const x = (e.clientX-left) / width
        const y = (e.clientY-top) / height

        setZoomImageCoordinate({x,y})
    }

  return (
    <div className='container mx-auto p-4 '>

        <div className=' min-h-[200px] flex'>
            <div className='flex flex-col-reverse lg:flex-row gap-4 '> 

                <div className='h-full '>
                    {
                        loading ? (
                            <div className='flex gap-2 lg:flex-col h-full overflow-scroll custom-scroll-none' >
                                {
                                    productImageListLoadin.map((el, index) =>{
                                        return(
                                            <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse  '>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        ) : (
                            <div className='flex gap-2 lg:flex-col h-full overflow-scroll custom-scroll-none' >
                                {
                                    data.productImage.map((imageUrl, index) =>{
                                        return(
                                            <div key={index} className='h-20 w-20 bg-slate-200 rounded p-1 '>
                                                <img src={imageUrl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer ' onMouseEnter={()=>handleMouseInterProduct(imageUrl)} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        )
                    }
                </div>
                <div className='h-[300px] w-[340px] lg:h-96 lg:w-96 bg-slate-200 relative '>
                    <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={()=>setZoomImage(!zoomImage)} />

                    {/***product zoom  */}
                    
                    {
                        zoomImage && (
                            <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] overflow-hidden bg-slate-200 p-1 top-0 -right-[510px]  '>
                        <div className='w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply scale-150 '
                            style={{
                                backgroundImage: `url(${activeImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                            }}
                        >

                        </div>
                      </div>
                        )

                    }

                </div>
            </div>
            <div>
                
            </div>

            {
                loading ? (
                    <div className='p-4 '>
                <p className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-full inline-block  '></p>
                <h2 className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-full inline-block  '></h2>
                <p className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-full inline-block  '></p>
                <div className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-[50%] inline-block  '>
                
                </div>
                <div className='font-medium text-2xl lg:text-4xl flex items-center gap-4 py-2'>
                    <p className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-full inline-block  '></p>
                    <p className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-full inline-block   '></p>
                </div>
                <div className='gap-2 flex items-center my-1 '>
                    <button className=' border-red-500 bg-slate-200 h-6 rounded-full px-3 py-1 font-medium  min-w-[120px]  transition-all '></button>
                    <button  className=' border-red-500 bg-slate-200 h-6 rounded-full px-3 py-1 font-medium  text-white min-w-[120px]  transition-all '></button>
                </div>
                <div className='my-2 '>
                <p className='bg-slate-200 animate-pulse h-6 text-red-600 px-2 rounded-full w-full inline-block  '></p>
                <p className='bg-slate-200 animate-pulse h-20 text-red-600 px-2 rounded w-full inline-block  '></p>
                </div>
             </div>

                ) : (

                <div className='p-4 '>
                <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit '>{data.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium capitalize '>{data.productName}</h2>
                <p className='text-slate-400  capitalize '>{data.category}</p>
                <div className='text-red-500 flex items-center gap-1 '>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf/>
                </div>
                <div className='font-medium text-2xl lg:text-4xl flex items-center gap-4 py-2'>
                    <p className='text-red-500 '>{data.sellingPrice}</p>
                    <p className='line-through text-slate-400  '>{data.price}</p>
                </div>
                <div className='gap-2 flex items-center my-1 '>
                    <button className='border-2 border-red-500 px-3 py-1 font-medium rounded min-w-[120px] hover:bg-red-500 hover:text-white transition-all '>Buy</button>
                    <button  className='border-2 border-red-500 bg-red-500 px-3 py-1 font-medium rounded text-white min-w-[120px] hover:bg-white hover:text-red-500 transition-all '>Add to Cart</button>
                </div>
                <div className='my-2 '>
                    <p className='font-bold '>Description:</p>
                    <p>{data.description}</p>
                </div>
            </div>
                )
            }
            
        </div>
    </div>
  )
}
