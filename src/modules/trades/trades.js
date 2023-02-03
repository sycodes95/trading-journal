import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewTrade from "./newTrade/newTrade";

import * as Dialog from '@radix-ui/react-dialog';
import TradesList from "./tradesList/tradesList";


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
        <div className="text-3xl relative z-10 text-black p-4 w-full flex items-center
        bg-green-500 bg-opacity-70" >
          <span>Journal</span>
        </div>
        
        <TradesList userInfo={userInfo}/>
        
      </div>
  )
}

export default Trades;