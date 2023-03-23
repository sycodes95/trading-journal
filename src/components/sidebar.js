import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import dashboardSVG from "../icons/dashboard.svg"
import tradesSVG from "../icons/trades.svg"
import instrumentsSVG from "../icons/instruments.svg"
import setupsSVG from "../icons/setups.svg"
import variablesSVG from "../icons/variables.svg"

function Sidebar () {
  

  return(
    <div className="sidebar h-full flex items-center justify-center gap-x-6
    relative bg-black bg-opacity-25">
      
      <Link to='/dashboard' className="flex justify-center items-center h-8 ">
        <ReactSVG className="text-white h-4 w-4 fill-current mr-2 "src={dashboardSVG}/>
        
        <span className="text-white hover:text-gray-500 transition-all text-xs w-full ">DASHBOARD</span>
      
      </Link>
      <Link to='/trades' className="flex justify-center items-center h-8">
        <ReactSVG className="text-white h-4 w-4 fill-current mr-2 "src={tradesSVG}/>
        <span className="text-white hover:text-gray-500 transition-all text-xs   w-full">TRADES</span>
      </Link>
      <Link to='/instruments' className="flex justify-center items-center h-8">
      <ReactSVG className="text-white h-4 w-4 fill-current mr-2 "src={instrumentsSVG}/>
        <span className="text-white hover:text-gray-500 transition-all text-xs   w-full">INSTRUMENTS</span>
      </Link>
      <Link to='/setups' className="flex justify-center items-center h-8">
        <ReactSVG className="text-white h-4 w-4 fill-current mr-2 " src={setupsSVG}/>
        <span className="text-white hover:text-gray-500 transition-all text-xs  w-full">SETUPS</span>
      </Link>
      <Link to='/variables' className="flex justify-center items-center h-8">
      <ReactSVG className="text-white h-4 w-4 fill-current mr-2 " src={variablesSVG}/>
        <span className="text-white hover:text-gray-500 transition-all text-xs  w-full">VARIABLES</span>
      </Link>
    </div>

  
  )
}


export default Sidebar;