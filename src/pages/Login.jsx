import React, { useContext, useState } from 'react'
import logInIcon from '../assest/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';



export default function Login() {

    const [showPassword, setPassword] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const {fetchUserDetails, countAddToCartProduct} = useContext(Context)

    const handleOnChange = (e) =>{
        const {name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name]:value

            }
            
        })
    }
    
    const hanldeSubmit = async (e) =>{
        e.preventDefault()
        try {
            const dataResponse= await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include', 
                headers: {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if(dataApi.success){
                toast.success(dataApi.message)
                
                navigate("/")
                fetchUserDetails()
                countAddToCartProduct()
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }

        } catch (error) {
              console.error("Error fetching data:", error);
        }
    }


  return (
    <section id='login'>
        <div className="mx-auto container p-4">
            <div className="bg-white p-5 w-full max-w-sm mx-auto">
                <div className='w-20 h-20 mx-auto rounded-full '>
                    <img src={logInIcon} alt="login icon"  />
                </div>

                <form  className='pt-6 flex flex-col gap-2 ' onSubmit={hanldeSubmit}>
                    <div className='grid'>
                        <label htmlFor="">Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="email" 
                                placeholder='enter email...' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

                    <div className='grid'>
                        <label htmlFor="">Password : </label>
                        <div className='bg-slate-100 p-2 flex items-center '>
                            <input type={showPassword ? "text" : "password"}
                                 placeholder='enter password...'
                                 name='password'
                                 value={data.password}
                                 onChange={handleOnChange}
                                 className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer' onClick={()=>setPassword(!showPassword)}>
                                <span>
                                    {
                                        showPassword ? <FaEyeSlash /> : <FaEye />
                                    }
                                
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600 '>
                            Forgot password
                        </Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white w-full max-w-[150px] rounded-full px-5 py-2 mx-auto hover:scale-110 transition-all mt-5 block'>Login</button>
                </form>

                <p className='mt-5'>
                    Don't have an account ? <Link to={"/sign-up"} className='underline hover:text-red-600 '>Sign up </Link>
                </p>
            </div>
        </div>
    </section>    
)
}
