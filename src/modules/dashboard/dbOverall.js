import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import tradesSVG from "../../icons/trades.svg"
import thumbsUpSVG from "../../icons/dashboard/thumbs-up.svg"

import thumbsDownSVG from "../../icons/dashboard/thumbs-down.svg"

import moment from "moment";
import DbLosses from "./dbOverallComps/dbLosses";
import DbGL from "./dbOverallComps/dbGL";
import DbGLR from "./dbOverallComps/dbGLR";
import DbWins from "./dbOverallComps/dbWins";
import DbWR from "./dbOverallComps/dbWR";
import DbPNLGraph from "./dbPNLGraph";

function DbOverall (props){
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
    <div className="grid grid-cols-4  gap-x-4">
     
      <div className="section-info col-span-4 text-black p-4 bg-yellow-500 bg-opacity-70 rounded-sm
        grid mb-8">
        <div className="">
          <ReactSVG className="h-14 w-14 " src={tradesSVG}/>
        </div>

        <div className="pl-8">
          <div className="text-3xl">
            <span>Dashboard</span>
          </div>
          <div className="text-sm">
            <span>
              Create, edit, and track your trades. Sort by categories or use the search bar to find specific trades.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-rows-6 col-span-1 row-start-2 row-span-1 ">
        <div className="row-span-1 grid grid-cols-3 bg-striped-125px text-white rounded-sm">

          <div className='overall col-start-1 col-span-1  flex justify-center items-center 
          w-full'>

            <button className={` ${overallTrades && ' border-b border-white'}
            bg-opacity-80 h-6 p-1 flex items-center justify-center text-xs`}
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

        <div className="general-stats row-span-5 grid grid-cols-3 grid-rows-2 bg-striped-content-big bg-opacity-20">
          
          <DbWins trades={trades}/>
          <DbLosses trades={trades}/>
          <DbWR trades={trades}/>
          <DbGL trades={trades}/>
          <DbGLR trades={trades}/>
          
        </div>


      </div>

      
      <div className="w-full col-span-3 row-span-1 grid grid-rows-6 ">
        <div className="flex items-center justify-center col-span-1 row-span-1 bg-dev
        text-white rounded-sm">
          <span>PERFORMANCE (PNL)</span>
        </div>
        <div className="row-span-5 ">
          <DbPNLGraph trades={trades}/>
        </div>
        
      </div>

      



      
    </div>
  )
}

export default DbOverall;
