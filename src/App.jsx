import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'




function App() {

  const dispatch = useDispatch()

  const fetchUserDetails = async () =>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()

    if(dataApi){

      dispatch(setUserDetails(dataApi?.data))
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])


  const [cartProductCount, setCartProductCount] = useState(0)
  //count add to cart product '
  const countAddToCartProduct = async() =>{
      try {
          const response = await fetch(SummaryApi.countAddToCartProduct.url,{
              method : SummaryApi.countAddToCartProduct.method,
              credentials: 'include',
          })

          const dataResponse = await response.json()
          const productCount = dataResponse?.data?.count || 0;

          setCartProductCount(productCount)

      } catch (error) {
          console.log("Error occure during count product:", error)
      }
  }
  
  useEffect(()=>{
      countAddToCartProduct()
  },[])


  return (
    <>
     <Context.Provider value ={{
       fetchUserDetails, // user details sets
       cartProductCount, //user add to cart product count
       countAddToCartProduct //add to cart product add
     }} >
      
      <Header/>
      <ToastContainer />
      <main className='min-h-[calc(100vh-120px)] pt-16 '>
      <Outlet />
      </main>
      <Footer/>

     </Context.Provider>


    </>
  )
}

export default App
