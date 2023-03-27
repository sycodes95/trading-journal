import { useEffect, useState } from "react"

function GainLossR (props) {
  const trades = props.trades

  const [gainLossR, setGainLossR] = useState(0)

  const getGainLossR = () =>{
    let rMultiples = []
    trades.forEach(trade =>{
      if(!trade.sl || !trade.exit || !trade.entry || !trade.position){
        return
      }
      let risk = Math.abs(trade.entry - trade.sl);
      let profitLoss = trade.position === 'LONG' ? trade.exit- trade.entry : trade.entry - trade.exit;
      let rMultiple = profitLoss / risk;
      rMultiples.push(rMultiple);
    })

    let avgR = Math.round((rMultiples.reduce((total, r) => total + r, 0) / rMultiples.length) * 100) / 100;
    
    setGainLossR(avgR)
  }
  useEffect(()=>{
    //Get WIN RATE
    trades && getGainLossR()
  },[trades])

  return (
    

    
  <div className="flex justify-center items-center text-gray-400">  
    <div className="w-full flex justify-between bg-black bg-opacity-25 pl-4 pr-4">
      <div className="flex justify-center items-center text-sm">
        <span>AVG R MULTIPLE</span>
      </div>
      <div className="flex justify-center text-xl font-bold ">
      <span>{gainLossR}</span>
      </div>
      
    </div>
  </div>
  )
}

export default GainLossR;