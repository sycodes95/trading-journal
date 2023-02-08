import { useEffect, useState } from "react"


function DbLosses (props) {

  const trades = props.trades

  const [losses, setLosses] = useState(null)

  const getLossesCount = () =>{
    let losingTrades = trades.filter(t => t.fgl < 0)
    setLosses(losingTrades.length)
  }

  useEffect(()=>{
    //Get WIN RATE
    trades && getLossesCount()
  },[trades])

  return (
    <div className="grid grid-rows-2 items-center text-red-600">
      <div className="flex justify-center text-xl font-bold text-red-600">
        <span>{losses === 0 ? '0' : losses} </span>
      </div>
      <div className="flex justify-center text-xs">
        <span>Losses</span>
      </div>
      
    </div>
  )
}

export default DbLosses;