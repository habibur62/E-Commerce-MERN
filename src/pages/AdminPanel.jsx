import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

export default function AdminPanel() {
    const user = useSelector(state => state?.user?.user)

  return (
    <div className='min-h-[80vh] w-full flex '>

        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32  flex justify-center items-center  flex-col'>
                 <div className='text-3xl cursor-pointer'>
                     {
                        user?.profilePic ? (
                            <img src={user.profilePic} alt={user?.name} className='w-20 h-20 rounded-full'/>
                        ) :(
                            <FaRegUserCircle/>
                        )
                    } 
                 </div>
                <h2 className='capitalize text-lg font-semibold '>{user?.name}</h2>
                <p className='text-sm'>{user?.role}</p>
            </div>
            {/************navigate *************** */}
            <div>
                <nav className='grid p-4'>
                   <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                   <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>Products</Link>

                </nav>
            </div>
        </aside>
        <main className='w-full h-full'>
            <Outlet/>
        </main>
    </div>
  )
}
