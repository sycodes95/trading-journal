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
import DbMainGraph from "./dbMainGraph";

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
    console.log('trades FETCH');
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
      <div className="section-info col-span-4 text-black p-4 bg-yellow-600 bg-opacity-50 rounded-sm
        grid  row-start-1">
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

      <div className="w-full flex flex-col col-span-1 row-start-2 row-span-1 ">

        <div className="row-span-1 grid grid-cols-3  text-black rounded-sm  bg-white top-left-round bottom-right-round
        font-bold text-xs h-6 border border-gray-300">

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
        <div className="general-stats row-span-5 grid grid-cols-3 grid-rows-2 bg-white bg-opacity-20">
          
          <DbWins trades={trades}/>
          <DbLosses trades={trades}/>
          <DbWR trades={trades}/>
          <DbGL trades={trades}/>
          <DbGLR trades={trades}/>
        </div>

        

      </div>

      <div className="col-span-3  row-span-2 flex flex-col">
        
        <div className="flex items-center justify-center col-span-1 bg-white 
        text-black border border-gray-300 text-xs rounded-sm h-6 top-left-round bottom-right-round">
          <span>VARIABLES</span>
        </div>
        <div className="row-span-5 h-full bg-white">
          <DbMainGraph trades={trades} userInfo={userInfo}/>
          
        </div>
      </div>

      <div className="">
        <div className="flex items-center justify-center col-span-1 row-span-1 bg-white 
      text-black border border-gray-300 rounded-sm h-6 text-xs top-left-round bottom-right-round">
          <span>PERFORMANCE (PNL)</span>
        </div>
        <div className="bg-white">
          <DbPNLGraph trades={trades}/>
        </div>
      </div>
      
    </div>
  )
}

export default DbOverall;
