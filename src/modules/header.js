import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tjlogo from "../images/TJ-logos_transparent.png"

function Header () {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  
  const handleLogOut = () =>{
    
    fetch('http://localhost:5000/logout', {
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
    <div className="header relative z-10 max-h-12 h-12  pl-4 pr-8 flex items-center justify-between
    text-white  bg-white w-full " > 
    

      <div className="header-logo text-4xl font-bold text-black">
        <img className="h-32" src={tjlogo}/>
      </div>

      {
        !userLoggedIn ? 

        <div className="header-nav grid grid-cols-2  text-black">
          <Link className="flex justify-center w-32 col-span-1 text-white text-sm font-black-outline-light" to='/login'>
            <span className="hover:cursor-pointer">LOG IN</span>
          </Link>
          <Link className="flex justify-center items-center w-32 col-span-1 text-white text-sm font-black-outline-light" to='/signup'>
            <span className="hover:cursor-pointer">REGISTRATION</span>
          </Link> 
        </div>

        :

        <div className="header-nav grid grid-cols-2 gap-x-2 text-black  ">
          
          <Link className="flex justify-center" to='/profile' >
            <span className="polygon-child hover:cursor-pointer">Profile</span>
          </Link> 
          <button className="" onClick={handleLogOut}>
            <span className="polygon-child hover:cursor-pointer">Log out</span>
          </button> 
        </div>
        
      }

  </div>

  
  )
}


export default Header;