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
    <div className="header max-h-12 h-12 w-full pl-8 pr-8 bg-slate-400 flex items-center justify-between">

      <div className="header-logo text-4xl text-white ">Trade Journal</div>

      {
        !userLoggedIn ? 

        <div className="header-nav text-white grid grid-cols-2">
          <Link to='/login'>
            <span className="hover:cursor-pointer">Log in</span>
          </Link>
          <Link to='/signup'>
            <span className="hover:cursor-pointer">Sign up</span>
          </Link> 
        </div>

        :

        <div className="header-nav text-white grid grid-cols-3 gap-x-2 ">
          <Link to='/trades'>
            <span className="hover:cursor-pointer">Trades</span>
          </Link>
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