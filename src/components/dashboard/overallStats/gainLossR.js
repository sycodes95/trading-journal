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

  useEffect(()=>{
    //Get WIN RATE
    console.log(gainLossR);
  },[gainLossR])


  return (
    

    <div className="flex justify-center items-center text-black">
      <div className="m-2 bg-opacity-50 rounded-md  flex items-center">
        <div className="w-full">
          <div className="flex justify-center text-lg font-bold ">
            <span>{gainLossR}</span>
          </div>
          <div className="flex justify-center text-xs">
            <span>Avg (R)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GainLossR;