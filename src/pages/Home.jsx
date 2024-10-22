import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VarticalCardProduct from '../components/VarticalCardProduct'

export default function Home() {

  
  return (
    <div>
        <CategoryList />
        <BannerProduct />
        <HorizontalCardProduct category = {"airdopes"} heading={"Top's Airpodes"} />

        <HorizontalCardProduct category = {"camera"} heading={"Top's Cameras"} />
        <VarticalCardProduct category = {"mobiles"} heading={"Top's Mobiles"} />
        <VarticalCardProduct category = {"earphones"} heading={"Top's Eyaphones"} />


    </div>
  ) 
}
