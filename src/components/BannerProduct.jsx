import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.jpg'
import image2 from '../assest/banner/img2.jpg'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'


function BannerProduct() {

  const [currnetSlide, setCurrentSlide] = useState(0);


  const desktopImages = [
    image1, image2, image3, image4, image5
  ]

  const mobileImages = [
    image1Mobile, image2Mobile,image3Mobile,image4Mobile,image5Mobile
  ]


  const handleleft = () =>{
    setCurrentSlide( currnetSlide === 0 ? desktopImages.length-1 : currnetSlide-1  )
  }


  const handleright = () =>{
    setCurrentSlide(currnetSlide === desktopImages.length-1 ? 0 : currnetSlide +1 )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === desktopImages.length - 1 ? 0 : prevSlide + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [desktopImages.length]); 

  return (
    <div className='container mx-auto rounded flex justify-center items-center relative h-80 '> 
      <BsArrowLeftCircleFill onClick={handleleft} className='absolute text-white left-1 text-2xl cursor-pointer '/>
          {
          desktopImages.map((image, index)=>{
            return (

                <img src={image} key={index} className={ currnetSlide === index ? "w-full object-fit h-full transition-all" : "hidden "} />
              
            )
          })

           }

      <BsArrowRightCircleFill onClick={handleright} className='absolute text-white right-1 text-2xl cursor-pointer '/>
      <span className="absolute bottom-1 flex gap-2 ">
      {
          desktopImages.map((_, index)=>{
            return (

                <button key={index} className={ currnetSlide === index ? "w-7 h-6 bg-white cursor-pointer border-none outline-none rounded-3xl transition-all " : " w-7 h-6 bg-gray-700 cursor-pointer border-none outline-none rounded-3xl transition-all "} > </button>
              
            )
          })

           }
        </span>
      </div>
  )
}

export default BannerProduct