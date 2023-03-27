import { useEffect, useRef, useState } from "react";

import LossCount from "./lossCount";
import GainLoss from "./gainLoss";
import GainLossR from "./gainLossR";
import WinCount from "./winCount";
import WinRate from "./winRate";



import AdvancedGraph from "../advancedGraph/advancedGraph";
import Banner from "./banner";
import PnlGraph from "../pnlGraph/pnlGraph";


function OverallStats (props){
  const userInfo = props.userInfo
  const {trades, setTrades} = props.tradesContext

  const [overallTrades, setOverallTrades] = useState(true)
  const [lastWeekTrades, setLastWeekTrades] = useState(null)
  const [lastMonthTrades, setLastMonthTrades] = useState(null)

  const handleOverallTrades = () =>{
    setLastMonthTrades(false)
    setOverallTrades(true)
    setLastWeekTrades(false)
  }

  const handleLastWeekTrades = () =>{
    setLastMonthTrades(false)
    setOverallTrades(false)
    setLastWeekTrades(true)
  }

  const handleLastMonthTrades = () =>{
    setLastMonthTrades(true)
    setOverallTrades(false)
    setLastWeekTrades(false)
  }
  
  useEffect(()=>{
  },[trades])
  
  useEffect(()=>{
    //Get OVER ALL TRADES
    if(overallTrades && userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        
        setTrades(data.trades)
        
      })
    }
  },[overallTrades])

  useEffect(()=>{
    //Get LAST MONTH TRADES
    if(lastWeekTrades && userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get-week?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        setTrades(data.trades)
      })
    }
  },[lastWeekTrades])



  useEffect(()=>{
    //Get LAST MONTH TRADES
    if(lastMonthTrades && userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get-month?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        setTrades(data.trades)
      })
    }
  },[lastMonthTrades])
  
  return(
    <div className="grid grid-cols-4  gap-x-4 gap-y-4">
      <Banner/>

      <div className="overall-stats w-full flex flex-col bg-black bg-opacity-25 col-span-1">

        <div className="row-span-1 grid grid-cols-3  text-white rounded-sm bg-striped-dark-alt 
        font-bold text-xs h-6 ">

          <div className='overall col-start-1 col-span-1  flex justify-center items-center 
          w-full'>

            <button className={` ${overallTrades && ' border-b border-white'}
            bg-opacity-80 h-6 p-1 flex items-center justify-center text-xs hover:text-gray-500 transition-all`}
            onClick={handleOverallTrades}>OVERALL</button>
            
          </div>

          <div className="weekly col-start-2 col-span-1   flex justify-center items-center
          w-full ">
            <button className={` ${lastWeekTrades && ' border-b border-white'}
            bg-opacity-80 h-6 p-1 flex items-center justify-center text-xs`}
            onClick={handleLastWeekTrades}>LAST WEEK</button>
          </div>

          <div className="monthly col-start-3 col-span-1  flex justify-center items-center
           w-full">

            <button className={`${lastMonthTrades && 'border-b border-white' }
            bg-opacity-80 h-6 p-1 flex items-center justify-center text-xs`}
            onClick={handleLastMonthTrades}>LAST MONTH</button>

          </div>

        </div>

        {
        //-----------------------------------------------------------------------------------------------------------------
        }
        <div className="flex flex-col justify-between gap-y-2 p-2">
          <WinRate trades={trades}/>
          <WinCount trades={trades}/>
          <LossCount trades={trades}/>
          
          <GainLoss trades={trades}/>
          <GainLossR trades={trades}/>
        </div>

      </div>
      <div className="overall-performance row-start-1 col-start-2">
        <div className="bg-black bg-opacity-25 h-full">
          
          <div className="">
            <PnlGraph trades={trades}/>
          </div>
        </div>
      </div>

      <div className="overall-main-graph col-span-4  row-span-2 flex flex-col bg-black bg-opacity-25">
        <div className="row-span-5 h-full object-cover">
          <AdvancedGraph trades={trades} userInfo={userInfo}/>
          
        </div>
      </div>

      
      
    </div>
  )
}

export default OverallStats;
