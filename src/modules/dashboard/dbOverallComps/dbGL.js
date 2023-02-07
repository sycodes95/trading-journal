import { useEffect, useState } from "react"


function DbGL (props) {
  const trades = props.trades
  const [gainLoss, setGainLoss] = useState(null)

  

  const getGainLoss = () =>{
    let allValues = []
    trades.forEach((t,i) =>{t.fgl && allValues.push(t.fgl)})
    let gl = allValues.reduce((acc, cur) =>{ return acc + cur},0)
    setGainLoss(gl)
  }

  useEffect(()=>{
    //Get WIN RATE
    trades && getGainLoss()
  },[trades])

  return (
    
    <div className="grid grid-rows-2 items-center ">
      <div className="flex justify-center text-xl">
        <span>{gainLoss > 0 ? `+${gainLoss}` : `${gainLoss}`} </span>
      </div>
      <div className="flex justify-center text-xs">
        <span>(G/L) Total Gain/Loss </span>
      </div>
      
    </div>
     
  )
}

export default DbGL;