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
    <div className="flex justify-center items-center text-blue-400">
      
        <div className="w-full flex justify-between bg-black bg-opacity-25 pl-4 pr-4">
          <div className="flex justify-center items-center text-sm">
            <span>WIN COUNT</span>
          </div>
          <div className="flex justify-center text-xl font-bold ">
            <span>{wins === 0 ? '0' : wins} </span>
          </div>
          
        </div>
      
    </div>
  
  )
}

export default WinCount;