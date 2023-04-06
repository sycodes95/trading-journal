import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function WinRate (props) {

  const trades = props.trades

  const [winRate, setWinRate] = useState(0)

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
      
        <div className="w-full flex flex-col gap-y-2 bg-black bg-opacity-25 p-2">
          <div className="flex justify-center text-lg font-bold h-24">
            <CircularProgressbar
            value={winRate}
            text={`${winRate}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "rgba(0,0,0,0.4)",
              textColor: "#fff",
              pathColor: "rgba(0,100,255,0.4)",
              trailColor: "transparent"
            })}
            />
          </div>
          <div className="flex justify-center text-sm">
            <span>WIN RATE</span>
          </div>
        
        </div>
    </div>
  )
}

export default WinRate;