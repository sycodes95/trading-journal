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
    <div className="flex justify-center items-center text-white">
      <div className="m-2 bg-ruby bg-opacity-50 rounded-md w-14 h-14 flex items-center">
        <div className="w-full">
          <div className="flex justify-center text-xl font-bold ">
            <span>{losses === 0 ? '0' : losses} </span>
          </div>
          <div className="flex justify-center text-xs">
            <span>Losses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DbLosses;