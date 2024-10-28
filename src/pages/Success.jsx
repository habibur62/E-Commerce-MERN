import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

export default function Success() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState("")
  const fetchpayment = async() =>{
    setLoading(true)
    const response = await fetch(SummaryApi.successPayment.url,{
        method: SummaryApi.successPayment.method,
        credentials: 'include',
        headers: {
            "content-type": "application/json"
        }
    })
    setLoading(false)

    const responseData = await response.json()
    console.log(responseData)
    if(responseData.success){
        setData(responseData.data)

    }
}

useEffect(()=>{
  fetchpayment()
},[])



  return (
    <div>Success</div>
  )
}
