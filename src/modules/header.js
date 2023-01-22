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
    <div className="header  max-h-12 h-12 w-full pl-8 pr-8 bg-white flex items-center justify-between border-b border-black border-dashed">

      <div className="header-logo text-4xl text-black font-bold">T J</div>

      {
        !userLoggedIn ? 

        <div className="header-nav text-black grid grid-cols-2 font-thin">
          <Link to='/login'>
            <span className="hover:cursor-pointer">Log in</span>
          </Link>
          <Link to='/signup'>
            <span className="hover:cursor-pointer">Sign up</span>
          </Link> 
        </div>

        :

        <div className="header-nav text-black grid grid-cols-2 gap-x-2 font-thin">
          
          <Link to='/profile'>
            <span className="hover:cursor-pointer">Profile</span>
          </Link> 
          <Link to='/logout'>
            <span className="hover:cursor-pointer">Log out</span>
          </Link> 
        </div>
        
      }

  </div>

  
  )
}


export default Header;