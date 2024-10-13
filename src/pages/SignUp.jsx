import React, { useState } from 'react'
import logInIcon from '../assest/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

export default function SignUp() {

  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      confirmpassword: "",
      profilePic: ""
  })

  const navigate = useNavigate();

  const handleOnChange = (e) =>{
      const {name, value} = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name]:value

          }
          
      })
  }
  const handleUploadPic = async (e) =>{
    const file = e.target.files[0];
    
    const imagePic = await imageToBase64(file)

    setData((preve)=>{
        return{
            ...preve,
            profilePic: imagePic,

        }
        
    })
  }

  const hanldeSubmit = async(e) =>{
    e.preventDefault()

    if(data.password === data.confirmpassword){

        try {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        
            if (!dataResponse.ok) {
                throw new Error(`HTTP error! status: ${dataResponse.status}`);
            }
        
            const result = await dataResponse.json();
            if(result.success){
                toast.success(result.message)
                navigate("/login");
            }
            if(result.error){
                toast.error(result.message)
            }
             //toast message

        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
        

    }else{
        console.log("please match password")
    }

  }

  return (
    <section id='signup'>
    <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
            <div className=' w-20 h-20 mx-auto rounded-full relative overflow-hidden '>
                <div>
                <img src={data.profilePic || logInIcon} alt="login icon"/>
                </div>
                <form action="">
                    <label>
                        <div className='cursor-pointer  text-x5 bg-slate-200 text-center w-full absolute bottom-0 rounded-b-full bg-opacity-80 '>
                        Upload Photo
                        <input type="file" className='hidden' onChange={handleUploadPic}/>
                        </div>
                    </label>
                </form>

            </div>

            <form  className='pt-6 flex flex-col gap-2 ' onSubmit={hanldeSubmit}>
                <div className='grid'>
                    <label htmlFor="">Name : </label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type="text" 
                            placeholder='enter name...' 
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent' required/>
                    </div>
                </div>

                <div className='grid'>
                    <label htmlFor="">Email : </label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type="email" 
                            placeholder='enter email...' 
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent' required />
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
                             className='w-full h-full outline-none bg-transparent' required/>
                        <div className='cursor-pointer' onClick={()=>setPassword(!showPassword)}>
                            <span>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            
                            </span>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <label htmlFor="">Conform Password : </label>
                    <div className='bg-slate-100 p-2 flex items-center '>
                        <input type={showConfirmPassword ? "text" : "password"}
                             placeholder='enter conform password...'
                             name='confirmpassword'
                             value={data.confirmpassword}
                             onChange={handleOnChange}
                             className='w-full h-full outline-none bg-transparent' required />
                        <div className='cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                            <span>
                                {
                                    showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            
                            </span>
                        </div>
                    </div>

                </div>

                <button className='bg-red-600 hover:bg-red-700 text-white w-full max-w-[150px] rounded-full px-5 py-2 mx-auto hover:scale-110 transition-all mt-5 block'>Sign Up</button>
            </form>

            <p className='mt-5'>
                Already have an account ? <Link to={"/login"} className='underline hover:text-red-600 '>Login </Link>
            </p>
        </div>
    </div>
</section>  
  )
}
