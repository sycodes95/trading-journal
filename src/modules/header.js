import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
    <div className="header relative z-10 max-h-12 h-12  pl-8 pr-8 flex items-center justify-between
    text-white border-b border-jet bg-striped-header w-full" > 
    

      <div className="header-logo text-4xl font-bold ">T J</div>

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

        <div className="header-nav grid grid-cols-2 gap-x-2 font-thin">
          
          <Link to='/profile' className="">
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