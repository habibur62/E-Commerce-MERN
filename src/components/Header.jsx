import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role'
import Context from '../context';


export default function Header() {
    const user = useSelector(state => state?.user?.user)
   const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const navigate = useNavigate()
    const context = useContext(Context)
    const serachInput = useLocation()
    const [search, setSearch] = useState(serachInput?.search.split("=")[1])

   //logout --------------------------------------------
     const handleLogOut = async () =>{
        try {
            const response  = await fetch(SummaryApi.logout_user.url,{
                method: SummaryApi.logout_user.method,
                credentials: 'include', // Ensure cookies are included
            })
            const data = await response.json();

             if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails(null)); // Clear user details in Redux state
                navigate("/")
                } else {
                toast.error(data.message || "Logout failed!");
            }

        } catch (error) {
              console.error("Error during logout:", error);
        toast.error("An error occurred during logout.");
        }
                
    }

    const handleSearch = (e) =>{
        const {value} = e.target
        setSearch(value)
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate(`/search`)

        }
    }

 

   

  return (
    <header className='h-16 shadow-md bg-white w-full fixed z-40 '>
        <div className='h-full container flex items-center justify-between mx-auto px-4'>
            <div>
                <Link to={"/"}>
                  <Logo w={90} h={60} />

                </Link>
            </div>

            <div className='  flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 '>
                <input type="text" placeholder='search your product...' className='w-full outline-none' value={search} onChange={handleSearch}/>
                <div className='text-lg items-center min-w-[50px] h-8 bg-red-600 flex justify-center rounded-r-full text-white'> 
                      <FaSearch /> 
                </div>
            </div>
            <div className='flex items-center gap-7'>
                <Link to={"cart/"} className='text-3xl cursor-pointer relative'>
                     <FaShoppingCart />
                     {
                        user?._id && (
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center top-2 absolute'>
                                <p className='text-sm'>{context.cartProductCount}</p>
                            </div>
                        )
                     }
                     
                </Link>
                <div className='relative flex justify-center'>
                    {
                        user?._id &&(
                            <div className='text-3xl cursor-pointer' onClick={()=> setMenuDisplay(!menuDisplay)}>
                           {
                             user?.profilePic ? (
                            <img src={user.profilePic} alt={user?.name} className='w-10 h-10 rounded-full'/>
                              ) :(
                              <FaRegUserCircle/>
                              )
                             } 
                            </div>

                          )
                    }
                    
                     {  
                        user?.role === ROLE.ADMIN && (
                            menuDisplay && (
                                <div className='absolute bg-white  bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                                 <nav> 
                                  <Link to ={"admin-panel"} className='whitespace-nowrap p-4 hidden md:block ' onClick={()=> setMenuDisplay(!menuDisplay)}>Admin Panel</Link>
                                  </nav>
                                 </div>
                            )
                        )

                     
                     }

                </div>
                <div>
                    {
                        user?._id ? (
                            <button onClick={handleLogOut} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white '>LogOut</button>
                        ) :
                        (
                            <Link to={"/login"} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white '>Login</Link>

                        )
                        
                    } 

                </div>
            </div>
        </div>
    </header>
)
}
