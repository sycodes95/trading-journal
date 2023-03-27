import { useEffect, useState } from "react"


function LossCount (props) {

  const trades = props.trades

  const [losses, setLosses] = useState(null)

  const getLossesCount = () =>{
    let losingTrades = trades.filter(t => t.fgl < 0)
    
    if(!losingTrades || losingTrades.length < 1) {
      setLosses(0)
    } else {
      setLosses(losingTrades.length)
    }
  }

  useEffect(()=>{
    //Get WIN RATE
    trades && getLossesCount()
    !trades && setLosses(0)
  },[trades])

  useEffect(()=>{
  },[losses])

  return (
    <div className="flex justify-center items-center text-red-400">  
      <div className="w-full flex justify-between bg-black bg-opacity-25 pl-4 pr-4">
        <div className="flex justify-center items-center text-sm">
          <span>LOSS COUNT</span>
        </div>
        <div className="flex justify-center text-xl font-bold ">
          <span>{losses === 0 ? '0' : losses} </span>
        </div>
        
      </div>
    </div>
  )
}

export default LossCount;