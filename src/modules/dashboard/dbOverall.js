import { useEffect, useRef, useState } from "react";

function DbOverall (props){
  const userInfo = props.userInfo
  const {trades, setTrades} = props.tradesContext

  const [winRate, setWinRate] = useState(null)
  const [gainLoss, setGainLoss] = useState(null)
  const [gainLossR, setGainLossR] = useState(null)

  const [overallTrades, setOverallTrades] = useState(true)
  const [lastWeekTrades, setLastWeekTrades] = useState(null)
  const [lastMonthTrades, setLastMonthTrades] = useState(null)

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

  const getGainLossR = () =>{
    let winR = []
    let lossR = []
    trades.forEach(tr =>{
      if(!tr.tp || !tr.sl || !tr.exit || !tr.entry){
        return
      }
      if(tr.position){
        let r = Math.round(((tr.exit - tr.entry) / (tr.entry - tr.sl)) * 100) / 100
        r > 0 ? winR.push(r) : lossR.push(r)
      }
    })
    if((winR.length + lossR.length) < 2){
      return winR.length ? setGainLossR(winR[0]) : setGainLossR(lossR[0])
    }
    let winSum = winR.reduce((acc, cur)=>{
      return acc + cur;
    },0)
    let lossSum = lossR.reduce((acc, cur)=>{
      return acc + cur;
    },0)
    let result = Math.round(winSum / Math.abs(lossSum) * 100) / 100
    setGainLossR(result)
  }

  const handleLastMonthTrades = () =>{
    setLastMonthTrades(true)
    setOverallTrades(false)
    setLastWeekTrades(false)
  }

  const handleOverallTrades = () =>{
    setLastMonthTrades(false)
    setOverallTrades(true)
    setLastWeekTrades(false)
  }
  useEffect(()=>{
    //Get WIN RATE
    if(lastMonthTrades && userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get-month?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        
        setTrades(data.trades)
      })
    }
  },[lastMonthTrades])

  useEffect(()=>{
    //Get WIN RATE
    if(overallTrades && userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        
        setTrades(data.trades)
        
      })
    }
  },[overallTrades])

  useEffect(()=>{
    //Get WIN RATE
    if(trades){
      getWinRate()
      getGainLoss()
      getGainLossR()
    }
  },[trades])

  
  return(
    <div className="grid grid-cols-3">
      <div className='overall text-white bg-striped-header flex justify-center items-center h-12'>
        <button className={`border border-ruby ${overallTrades && 'bg-ruby'} bg-opacity-80 
        h-6 p-1 flex items-center justify-center w-1/2 rounded-sm`}
        onClick={handleOverallTrades}>OVERALL</button>
        
      </div>
      <div className="weekly text-white bg-striped-header flex justify-center items-center h-12">
        <button className="border border-ruby bg-opacity-80
         h-6 p-1 flex items-center justify-center w-1/2 rounded-sm">LAST WEEK</button>
      </div>
      <div className="monthly text-white bg-striped-header flex justify-center items-center h-12">
        <button className={`border border-ruby ${lastMonthTrades && 'bg-ruby'} bg-opacity-80 
        h-6 p-1 flex items-center justify-center w-1/2 rounded-sm`} onClick={handleLastMonthTrades}>LAST MONTH</button>
         
      </div>
      {
        
        <div className="grid grid-rows-2 items-center border border-gray-400">
          <div className="flex justify-center text-xl">
            <span>{winRate === 0 ? '0' : winRate}% </span>
          </div>
          <div className="flex justify-center text-xs">
            <span>(W/R) Win Rate </span>
          </div>
          
        </div>
        
        
      }
     
    
      {
        gainLoss && 
        <div className="grid grid-rows-2 items-center border border-gray-400">
          <div className="flex justify-center text-xl">
            <span>{gainLoss > 0 ? `+${gainLoss}` : `${gainLoss}`} </span>
          </div>
          <div className="flex justify-center text-xs">
            <span>(G/L) Gain Loss ($) </span>
          </div>
          
        </div>
      }

      {
        gainLossR && 
        <div className="grid grid-rows-2 items-center border border-gray-400">
          <div className="flex justify-center text-xl">
            <span>{gainLossR} </span>
          </div>
          <div className="flex justify-center text-xs">
            <span>(R G/L) Gain Loss Average (R) </span>
          </div>
          
        </div>
      }

      
      
    </div>
  )
}

export default DbOverall;
