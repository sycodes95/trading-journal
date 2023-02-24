import { useEffect, useState } from "react"
import Icon from '@mdi/react';
import { mdiThumbUpOutline } from '@mdi/js';


import { ReactSVG } from "react-svg"

function WinCount (props) {

  const trades = props.trades

  const [wins, setWins] = useState(null)

  const getWinsCount = () =>{
    let winningTrades = trades.filter(t => t.fgl > 0)
    setWins(winningTrades.length)
  }

  useEffect(()=>{
    //Get WIN RATE
    trades && getWinsCount()
    !trades && setWins(0)
  },[trades])

  return (
    <div className="flex justify-center items-center text-white">
      <div className="m-2 bg-steel-blue bg-opacity-50 rounded-md w-16 h-14 flex items-center">
        <div className="w-full">
          <div className="flex justify-center text-xl font-bold ">
            <span>{wins === 0 ? '0' : wins} </span>
          </div>
          <div className="flex justify-center text-xs">
            <span>Wins</span>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default WinCount;