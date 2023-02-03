import { useEffect, useRef, useState } from "react";

function Dashboard (){
  const [userInfo, setUserInfo] = useState(null)
  const [trades, setTrades] = useState(null)

  const [winRate, setWinRate] = useState(null)
  const [gainLoss, setGainLoss] = useState(null)

  const fetchTrades = () => {
    
    if(userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        console.log(data);
        setTrades(data.trades)
        
      })

    }
  }

  const getWinRate = () =>{
    let winningTrades = trades.filter(t => t.fgl > 0)
    let totalTrades = trades.filter(t => t.fgl)
    let wr = Math.floor((winningTrades.length / totalTrades.length) * 100)
    setWinRate(wr)
  }

  const getGainLoss = () =>{
    let allValues = []
    trades.forEach((t,i) =>{t.fgl && allValues.push(t.fgl)})
    let gl = allValues.reduce((acc, cur) =>{ return acc + cur},0)
    setGainLoss(gl)
  }
  useEffect(()=>{
    //Get WIN RATE
    if(trades){
      getWinRate()
      getGainLoss()
    }
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

  useEffect(()=>{
    fetchTrades()
  }, [userInfo])

  return(
    <div className="">
      {
        winRate && 
        <div>{winRate}%</div>
      }
      {
        gainLoss && 
        <div>{gainLoss}</div>
      }
    </div>
  )
}

export default Dashboard;
