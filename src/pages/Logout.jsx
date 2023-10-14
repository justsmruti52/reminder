import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let nav=useNavigate()
    const Logout=async () => {
        let res=await fetch('http://localhost:3000/currentuser',{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "isLogin":false
            })
        })
        let data=await res.json()
        nav('/')
    }
    Logout()
  return (
    <div>

    </div>
  )
}

export default Logout