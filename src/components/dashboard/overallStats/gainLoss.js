import { useEffect, useState } from "react"


function GainLoss (props) {
  const trades = props.trades
  const [gainLoss, setGainLoss] = useState(0)

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

    <div className="flex justify-center items-center text-black">
      <div className="m-2 bg-opacity-50 rounded-md  flex items-center">
        <div className="w-full">
          <div className="flex justify-center text-lg font-bold ">
            <span>{gainLoss > 0 ? `+${gainLoss}` : `${gainLoss}`}</span>
          </div>
          <div className="flex justify-center text-xs">
            <span>Total G/L</span>
          </div>
        </div>
      </div>
    </div>
     
  )
}

export default GainLoss;