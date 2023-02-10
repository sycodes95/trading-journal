import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewTrade from "./newTrade/newTrade";


import TradesList from "./tradesList/tradesList";
import tradesSVG from "../../icons/trades.svg"
import { ReactSVG } from "react-svg";

function Trades () {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    //Token
    const token = JSON.parse(localStorage.getItem('token'))
    
    if(token) {
      fetch('http://localhost:5000/verifytoken', {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
        
        if(data.user.user){
          setUserInfo(data.user.user)
        }
      })
      .catch(error => console.error(error))
    }
  }, [])

  useEffect(()=>{
    
  },[userInfo])
  return(
    
      <div className="relative w-full p-12 grid justify-center" >
        <div className="section-info text-black p-4 bg-ruby bg-opacity-50 rounded-sm
        grid ">
          <div className="">
            <ReactSVG className="h-14 w-14 " src={tradesSVG}/>
          </div>

          <div className="pl-8">
            <div className="text-3xl">
              <span>Journal</span>
            </div>
            <div className="text-sm">
              <span>
                Create, edit, and track your trades. Sort by categories or use the search bar to find specific trades.
              </span>
            </div>
          </div>
        </div>
        
        <TradesList userInfo={userInfo}/>
        
      </div>
  )
}

export default Trades;