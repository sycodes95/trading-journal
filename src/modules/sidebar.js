import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Sidebar () {
  

  return(
    <div className="sidebar  h-screen  grid grid-cols-1 auto-rows-min justify-center pt-8">
      
      <Link to='/dashboard' className="flex pl-8 items-center h-8 ">
        <span className="text-gray-500 hover:text-green-500 transition-all duration-500 text-sm font-bold  w-full ">Dashboard</span>
      </Link>
      <Link to='/trades' className="flex pl-8 items-center h-8">
        <span className="text-gray-500 hover:text-green-500 transition-all duration-500 text-sm font-bold  w-full">Trades</span>
      </Link>
      <Link to='/instruments' className="flex pl-8  items-center h-8">
        <span className="text-gray-500 hover:text-green-500 transition-all duration-500  text-sm font-bold  w-full">Instruments</span>
      </Link>
      <Link to='/setups' className="flex pl-8  items-center h-8">
        <span className="text-gray-500 hover:text-green-500 transition-all duration-500  text-sm font-bold  w-full">Setups</span>
      </Link>
      <Link to='/variables' className="flex pl-8  items-center h-8">
        <span className="text-gray-500 hover:text-green-500 transition-all duration-500  text-sm font-bold  w-full">Variables</span>
      </Link>
    </div>

  
  )
}


export default Sidebar;