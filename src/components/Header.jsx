import React from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className='h-16 shadow-md bg-white '>
        <div className='h-full container flex items-center justify-between mx-auto px-4'>
            <div>
                <Link to={"/"}>
                  <Logo w={90} h={60} />

                </Link>
            </div>

            <div className='hidden  lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 '>
                <input type="text" placeholder='search your product...' className='w-full outline-none '/>
                <div className='text-lg items-center min-w-[50px] h-8 bg-red-600 flex justify-center rounded-r-full text-white'> 
                      <FaSearch /> 
                </div>
            </div>
            <div className='flex items-center gap-7'>
                <div className='text-3xl cursor-pointer relative'>
                     <FaShoppingCart />
                     <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center top-2 absolute'>
                        <p className='text-sm'>0</p>
                     </div>
                </div>
                <div className='text-3xl cursor-pointer'>
                    <FaRegUserCircle/>
                </div>
                <div>
                    <Link to={"/login"} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white '>Login</Link>
                </div>
            </div>
        </div>
    </header>
)
}
