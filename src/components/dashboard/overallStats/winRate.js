import { useEffect, useState } from "react"


function WinRate (props) {

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
    

    <div className="flex justify-center items-center text-white">
      <div className="m-2 bg-black  bg-opacity-50 rounded-md w-16 h-14 flex items-center">
        <div className="w-full">
          <div className="flex justify-center text-lg font-bold ">
            <span>{winRate === 0 ? '0' : winRate}% </span>
          </div>
          <div className="flex justify-center text-xs">
            <span>Win Rate</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinRate;