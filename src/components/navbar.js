import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import dashboardSVG from "../icons/dashboard.svg"
import tradesSVG from "../icons/trades.svg"
import instrumentsSVG from "../icons/instruments.svg"
import setupsSVG from "../icons/setups.svg"
import variablesSVG from "../icons/variables.svg"

function NavBar () {
  

  return(
    <div className="sidebar h-full flex items-center justify-center gap-x-6
    relative bg-black bg-opacity-25">
      
      <Link to='/dashboard' className="flex justify-center items-center h-8
      text-white hover:text-gray-500 transition-all">

        <div className="flex justify-center items-center w-full">
          <ReactSVG className=" h-5 w-5 fill-current mr-2"src={dashboardSVG}/>
        </div>
        
        <span className="NAVBAR-TEXT text-sm">DASHBOARD</span>
      
      </Link>
      <Link to='/trades' className="flex justify-center items-center h-8
      text-white hover:text-gray-500 transition-all">
        <div className="flex items-center">
          <ReactSVG className=" h-5 w-5 fill-current mr-2"src={tradesSVG}/>
        </div>
        <span className="NAVBAR-TEXT text-sm">TRADES</span>
      </Link>
      <Link to='/instruments' className="flex justify-center items-center h-8
      text-white hover:text-gray-500 transition-all">
        <div className="flex items-center">
          <ReactSVG className=" h-5 w-5 fill-current mr-2"src={instrumentsSVG}/>
        </div>
        <span className="NAVBAR-TEXT text-sm">INSTRUMENTS</span>
      </Link>
      <Link to='/setups' className="flex justify-center items-center h-8
      text-white hover:text-gray-500 transition-all">
        <div className="flex items-center">
          <ReactSVG className=" h-5 w-5 fill-current mr-2"src={setupsSVG}/>
        </div>
        <span className="NAVBAR-TEXT text-sm">SETUPS</span>
      </Link>
      <Link to='/variables' className="flex justify-center items-center h-8
      text-white hover:text-gray-500 transition-all">
        <div className="flex items-center">
          <ReactSVG className=" h-5 w-5 fill-current mr-2"src={variablesSVG}/>
        </div>
        <span className="NAVBAR-TEXT text-sm">VARIABLES</span>
      </Link>
    </div>

  
  )
}


export default NavBar;