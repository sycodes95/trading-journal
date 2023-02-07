import { useEffect, useRef, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryArea, VictoryTheme } from 'victory';
import moment from "moment";
import DbLosses from "./dbLosses";
import DbGL from "./dbOverallComps/dbGL";
import DbGLR from "./dbOverallComps/dbGLR";
import DbWins from "./dbOverallComps/dbWins";
import DbWR from "./dbOverallComps/dbWR";

function DbOverall (props){
  const userInfo = props.userInfo
  const {trades, setTrades} = props.tradesContext

  const [overallTrades, setOverallTrades] = useState(true)
  const [lastWeekTrades, setLastWeekTrades] = useState(null)
  const [lastMonthTrades, setLastMonthTrades] = useState(null)
  

  const handleLastMonthTrades = () =>{
    setLastMonthTrades(true)
    setOverallTrades(false)
    setLastWeekTrades(false)
  }

  const handleOverallTrades = () =>{
    setLastMonthTrades(false)
    setOverallTrades(true)
    setLastWeekTrades(false)
  }

  const cumulativePNL = trades.map((tr, i) => ({
    exitdate: tr.exitdate,
    balance: trades.slice(0, i + 1).reduce((sum, trade) => sum + trade.fgl, 0)
  }));

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

  

  
  return(
    <div className="grid grid-cols-3 ">

      <div className='overall  text-white bg-striped-header flex justify-center items-center h-12'>
        <button className={` ${overallTrades ? ' bg-green-500 text-black' 
        : 'border border-gray-500 border-dashed' } bg-opacity-80 h-6 p-1 flex items-center justify-center w-1/2 rounded-sm`}
        onClick={handleOverallTrades}>OVERALL</button>
      </div>

      <div className="weekly text-white bg-striped-header flex justify-center items-center h-12">
        <button className="border border-gray-500 bg-opacity-80
         h-6 p-1 flex items-center justify-center w-1/2 rounded-sm">LAST WEEK</button>
      </div>

      <div className="monthly text-white bg-striped-header flex justify-center items-center h-12">
        <button className={`${lastMonthTrades ? 'bg-green-500 text-black' 
        : 'border border-gray-500 border-dashed'} bg-opacity-80 
        h-6 p-1 flex items-center justify-center w-1/2 rounded-sm`} onClick={handleLastMonthTrades}>LAST MONTH</button>
      </div>

      {
      //-----------------------------------------------------------------------------------------------------------------
      }

      <div className="general-stats col-span-3 grid grid-cols-6 bg-striped-content-big border-4 border-black border-opacity-90">
        <DbWins trades={trades}/>
        <DbLosses trades={trades}/>
        <DbWR trades={trades}/>
        <DbGL trades={trades}/>
        <DbGLR trades={trades}/>
        
      </div>

      <div className="w-full  col-span-3 border-l-4 border-r-4 border-b-4 border-black border-opacity-90">
        <VictoryChart width={1000} height={300} >
          {
            trades &&
            <VictoryArea theme={VictoryTheme.material}
              data={trades.map(tr =>({
                ...tr,
                exitdate: tr.exitdate
              })).reverse()}
              x="exitdate"
              y="fgl"
              domain={{ y: [Math.min(...trades.map(tr => tr.fgl)), Math.max(...trades.map(tr => tr.fgl))] }}
              style={{ data: { fill: "rgba(0, 0, 0, 0.2)" } }}
            />
            
          }
          <VictoryAxis
            tickFormat={(t) => moment(t).format('MM/DD/YYYY')}
            style={{ tickLabels: { fontSize: 10 } }}
          />
          <VictoryAxis dependentAxis />

          
        </VictoryChart>

      </div>

      



      
    </div>
  )
}

export default DbOverall;
