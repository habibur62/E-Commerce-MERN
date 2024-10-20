import React from 'react'
import { useParams } from 'react-router-dom'

export default function CategoryProduct() {
    const params = useParams()

    
  return (
    <div>
        {
            params.categoryName
        }
    </div>
  )
}
