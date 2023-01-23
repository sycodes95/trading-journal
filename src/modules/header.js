import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Header () {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
      setUserLoggedIn(true)
    }
  }, [])

  return(
    <div className="header  max-h-12 h-12 w-full pl-8 pr-8 flex items-center justify-between
    text-black border-b border-red-700" > 
    

      <div className="header-logo text-4xl font-bold">T J</div>

      {
        !userLoggedIn ? 

        <div className="header-nav grid grid-cols-2 font-thin ">
          <Link to='/login'>
            <span className="hover:cursor-pointer">Log in</span>
          </Link>
          <Link to='/signup'>
            <span className="hover:cursor-pointer">Sign up</span>
          </Link> 
        </div>

        :

        <div className="header-nav grid grid-cols-2 gap-x-2 font-thin ">
          
          <Link to='/profile' className="">
            <span className="polygon-child hover:cursor-pointer">Profile</span>
          </Link> 
          <Link to='/logout' className="">
            <span className="polygon-child hover:cursor-pointer">Log out</span>
          </Link> 
        </div>
        
      }

  </div>

  
  )
}


export default Header;