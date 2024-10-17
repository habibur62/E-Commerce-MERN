import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import {toast} from 'react-toastify'
import moment from 'moment'
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from '../components/ChangeUserRole';



export default function AllUsers() {
  const [allUser, setAllUsers] = useState([])
  const [updateDialoge, setUpdateDialoge] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState("")
  const fetchAllUsers = async() =>{
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
          method: SummaryApi.allUsers.method,
          credentials: 'include', 
          headers: {
              "content-type" : "application/json"
          },
      })

      const dataResponse = await fetchData.json()

      if(dataResponse.success){
        setAllUsers(dataResponse.data)
      }
      
      if(dataResponse.error){
        toast.error(dataResponse.message)
      }

  } catch (error) {
        console.error("Error fetching data:", error);
  }
  }

  useEffect(()=>{
    fetchAllUsers()
  },[])

  return (
    <div className='p-4'>
      <table className='w-full userTable'>
        <thead>
          <tr>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Profile Pic</th>
          <th>Create Date</th>
          <th>Action</th>

          </tr>
          
        </thead>
        <tbody>
        {
          allUser.map((user, index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='flex justify-center item-center '><img src={user.profilePic} className='w-10 h-10 rounded '></img></td>
                <td>{moment(user.createdAtmoment).format('LL')}</td>

                <td><button className='bg-green-300 p-2 rounded-full hover:bg-green-400 hover:text-white' 
                      onClick={()=>{
                        setUpdateDialoge(!updateDialoge)
                        setUpdateUserDetails(user)
                      }}>
                    <CiEdit />
                  </button></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
        {
         updateDialoge && (
         <ChangeUserRole 
         onClose={()=>setUpdateDialoge(!updateDialoge) }
             name = {updateUserDetails.name}
             email = {updateUserDetails.email}
             role = {updateUserDetails.role}
             userId = {updateUserDetails._id}   
             callUsers={fetchAllUsers()}       
        />
      )
        }

    </div>
  )
}
