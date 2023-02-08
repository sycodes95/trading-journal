import { useEffect, useState } from "react"
import Icon from '@mdi/react';
import { mdiThumbUpOutline } from '@mdi/js';


import { ReactSVG } from "react-svg"

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
    <div className="flex justify-center items-center text-white">
      
      <div className="m-2 bg-green-600 rounded-md w-10">
        <div className="flex justify-center text-xl font-bold ">
          <span>{wins === 0 ? '0' : wins} </span>
        </div>
        <div className="flex justify-center text-xs">
          <span>Wins</span>
        </div>

      </div>
      
      
    </div>
  )
}

export default DbWins;