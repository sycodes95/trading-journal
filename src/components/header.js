import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import edgescoutLogo from "../images/edgescout.png"

function Header () {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  
  const handleLogOut = () =>{
    
    fetch(`${process.env.REACT_APP_API_HOST}/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then((data)=>{
      
      if(!data.error) {
        localStorage.removeItem('token')
        window.location.href='/login'
      }
    })
  }
  
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
      setUserLoggedIn(true)
    }
  }, [])

  return(
    <div className="z-10 h-full  flex items-center justify-center
    text-white bg-black bg-opacity-20 " > 

      <div className="flex justify-between items-center h-12 w-10/12 relative overflow-hidden">

      
      <div className="header-logo text-4xl font-bold text-white">
        <img className="h-28" src={edgescoutLogo}/>
      </div>

      {
      !userLoggedIn ? 

      <div className="header-nav h-full grid grid-cols-2  text-white">
        <Link className="flex justify-center items-center text-xs bg-green-700 bg-opacity-10 p-2 
        hover:text-gray-600 transition-all" to='/login'>
          <span className="hover:cursor-pointer">LOG IN</span>
        </Link>
        <Link className="flex justify-center items-center text-xs bg-yellow-500 bg-opacity-10 p-2 
        hover:text-gray-400 transition-all" to='/signup'>
          <span className="hover:cursor-pointer">REGISTRATION</span>
        </Link> 
      </div>

      :

      <div className="header-nav h-full flex text-white">
        
        
        <button className="flex justify-center items-center text-xs bg-red-700 bg-opacity-25 p-2 
        hover:text-red-600 transition-all"
        onClick={handleLogOut}>
          <span className="polygon-child hover:cursor-pointer ">LOG OUT</span>
        </button> 
      </div>
        
      }
      </div>
  </div>

  
  )
}


export default Header;