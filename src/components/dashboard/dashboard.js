import { useEffect, useRef, useState } from "react";

import OverallStats from "./overallStats/overallStats";


function Dashboard (){
  const [userInfo, setUserInfo] = useState(null)
  const [trades, setTrades] = useState(null)

  const fetchTrades = () => {
    if(userInfo && userInfo.username){
      fetch(`${process.env.REACT_APP_API_HOST}/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        if(data.trades.length){
          const orderedTrades = data.trades.reverse()
          setTrades(orderedTrades)
        } 
      })
    }
  }

  useEffect(()=>{
    fetchTrades()
  }, [userInfo])

  useEffect(()=> {
    console.log(process.env.API_HOST);
  })

  useEffect(()=>{
    console.log(trades);
  },[trades])

  useEffect(()=>{
    //Token
    const token = JSON.parse(localStorage.getItem('token'))
    if(token) {
      fetch(`${process.env.REACT_APP_API_HOST}/verifytoken`, {
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
    <div className="pt-8 pb-12  flex justify-center">
     
      <div className="OVERALL-STATS-CONTAINER w-10/12">
        <OverallStats userInfo={userInfo} tradesContext={{trades, setTrades}} />
      </div>
      
    </div>
  )
}

export default Dashboard;
