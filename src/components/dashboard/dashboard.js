import { useEffect, useRef, useState } from "react";

import OverallStats from "./overallStats/overallStats";


function Dashboard (){
  const [userInfo, setUserInfo] = useState(null)
  const [trades, setTrades] = useState(null)

  const fetchTrades = () => {
    
    if(userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        console.log(data);
        if(data.trades.length) setTrades(data.trades)
        
        
      })

    }
  }

  useEffect(()=>{
    
    fetchTrades()
  }, [userInfo])

  useEffect(()=>{
    console.log('get FETCH');
  },[trades])

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
  return(
    <div className="p-8 ">
     
      <div className="">
        <OverallStats userInfo={userInfo} tradesContext={{trades, setTrades}} />
      </div>
      
    </div>
  )
}

export default Dashboard;
