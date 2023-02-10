import { useEffect, useState } from "react"

function DbGLR (props) {
  const trades = props.trades

  const [gainLossR, setGainLossR] = useState(null)

  const getGainLossR = () =>{
    let winR = []
    let lossR = []
    trades.forEach(tr =>{
      if(!tr.tp || !tr.sl || !tr.exit || !tr.entry){
        return
      }
      if(tr.position){
        let r = Math.round(((tr.exit - tr.entry) / (tr.entry - tr.sl)) * 100) / 100
        r > 0 ? winR.push(r) : lossR.push(r)
      }
    })
    if((winR.length + lossR.length) < 2){
      return winR.length ? setGainLossR(winR[0]) : setGainLossR(lossR[0])
    }
    let winSum = winR.reduce((acc, cur)=>{
      return acc + cur;
    },0)
    let lossSum = lossR.reduce((acc, cur)=>{
      return acc + cur;
    },0)
    let result = Math.round(winSum / Math.abs(lossSum) * 100) / 100
    setGainLossR(result)
  }
  useEffect(()=>{
    //Get WIN RATE
    trades && getGainLossR()
  },[trades])


  return (
    <div className="grid grid-rows-2 items-center ">
      <div className="flex justify-center text-xl">
        <span>{gainLossR} </span>
      </div>
      <div className="flex justify-center text-xs">
        <span>(G/L R) Total Gain Loss Avg. (R) </span>
      </div>
      
    </div>
  )
}

export default DbGLR;