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
    <div className="sidebar h-full grid grid-cols-1 auto-rows-min justify-center pt-8
    relative border border-r-gray-300 ">
      
      <Link to='/dashboard' className="flex pl-8 items-center h-8 ">
        <ReactSVG className="text-black h-4 w-4 fill-current mr-2 "src={dashboardSVG}/>
        <div>
          <span className="text-black hover:text-green-500 transition-all duration-500 text-sm   w-full ">Dashboard</span>
        </div>
      </Link>
      <Link to='/trades' className="flex pl-8 items-center h-8">
        <ReactSVG className="text-black h-4 w-4 fill-current mr-2 "src={tradesSVG}/>
        <span className="text-black hover:text-green-500 transition-all duration-500 text-sm   w-full">Trades</span>
      </Link>
      <Link to='/instruments' className="flex pl-8  items-center h-8">
      <ReactSVG className="text-black h-4 w-4 fill-current mr-2 "src={instrumentsSVG}/>
        <span className="text-black hover:text-green-500 transition-all duration-500  text-sm   w-full">Instruments</span>
      </Link>
      <Link to='/setups' className="flex pl-8  items-center h-8">
        <ReactSVG className="text-black h-4 w-4 fill-current mr-2 " src={setupsSVG}/>
        <span className="text-black hover:text-green-500 transition-all duration-500  text-sm  w-full">Setups</span>
      </Link>
      <Link to='/variables' className="flex pl-8  items-center h-8">
      <ReactSVG className="text-black h-4 w-4 fill-current mr-2 " src={variablesSVG}/>
        <span className="text-black hover:text-green-500 transition-all duration-500  text-sm  w-full">Variables</span>
      </Link>
    </div>

  
  )
}


export default Sidebar;