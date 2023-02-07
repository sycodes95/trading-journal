import { useEffect, useState } from "react"


function DbWins (props) {

  const trades = props.trades

  const [wins, setWins] = useState(null)

  const getWinsCount = () =>{
    let winningTrades = trades.filter(t => t.fgl > 0)
    setWins(winningTrades.length)
  }

  useEffect(()=>{
    //Get WIN RATE
    trades && getWinsCount()
  },[trades])

  return (
    <div className="grid grid-rows-2 items-center text-green-600">
      <div className="flex justify-center text-xl font-bold text-green-600">
        <span>{wins === 0 ? '0' : wins} </span>
      </div>
      <div className="flex justify-center text-xs">
        <span>Wins</span>
      </div>
      
    </div>
  )
}

export default DbWins;