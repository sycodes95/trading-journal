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
    
    

    <div className="flex justify-center items-center text-gray-400">
          
    <div className="w-full flex justify-between bg-black bg-opacity-25 pl-4 pr-4">
      <div className="flex justify-center items-center text-sm">
        <span>TOTAL GAIN/LOSS</span>
      </div>
      <div className="flex justify-center text-xl font-bold ">
        <span>{gainLoss >= 0 ? `+${gainLoss}` : `-${gainLoss}`}</span>
      </div>
      
    </div>

    </div>
     
  )
}

export default GainLoss;