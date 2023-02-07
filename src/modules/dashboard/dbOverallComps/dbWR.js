import { useEffect, useState } from "react"


function DbWR (props) {

  const trades = props.trades

  const [winRate, setWinRate] = useState(null)

  const getWinRate = () =>{
    let winningTrades = trades.filter(t => t.fgl > 0)
    let totalTrades = trades.filter(t => t.fgl)
    let wr = Math.floor((winningTrades.length / totalTrades.length) * 100)
    setWinRate(wr)
  }

  useEffect(()=>{
    //Get WIN RATE
    trades && getWinRate()
  },[trades])

  return (
    <div className="grid grid-rows-2 items-center ">
      <div className="flex justify-center text-xl">
        <span>{winRate === 0 ? '0' : winRate}% </span>
      </div>
      <div className="flex justify-center text-xs">
        <span>(W/R) Win Rate </span>
      </div>
      
    </div>
  )
}

export default DbWR;