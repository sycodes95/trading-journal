import { useEffect, useRef, useState } from "react";
import moment from "moment";

function TradesList(props){
  const userInfo = props.userInfo
  const [trades, setTrades] = useState(null)

  
  console.log(userInfo);
  useEffect(()=>{
    if(userInfo && userInfo.username){
      fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        console.log(data);
        setTrades(data.trades)
      })

    }
    
  },[userInfo])
  return(
    <div className="w-full  overflow-auto">
      <table className=" w-full ">
        <thead>
            <tr className=" text-white text-xs font-bold ">
                <th colSpan="1" className=" th-wrapper-start">
                  <div className="h-4 slant-start pl-4 pr-4 bg-striped">#</div>
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped ">ENTRY DATE</div> 
                </th>
                <th colSpan="1" className="th-wrapper">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">STATUS</div> 
                </th>
                
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">INSTRUMENT</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">SETUP</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">POSITION</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">P ENTRY</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">ENTRY</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">TP</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">SL</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">EXIT/DATE</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">EXIT</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">MFE</div> 
                </th>
                
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">MAE</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">GAIN/LOSS</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">FEES</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">VARIABLES</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">COMMENTS</div> 
                </th>
                <th colSpan="1" className="th-wrapper ">
                  <div className="h-4 font-thin slant-right pl-4 pr-4">LINKS</div> 
                </th>
            </tr>
        </thead>
        <tbody>
          {trades ? 
            trades.map((t, i) =>(
              <tr className="border-gray-300  h-4 ">
                <td colSpan="1" className=" text-center text-xs" >
                {i + 1}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {moment(t.entrydate).format("YYYY-MM-DD hh:mm")}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.open ? 'open' : 'closed'}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.instrument}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.setup}</td>
                <td colSpan="1" className=" text-center text-xs" >
                <span className="text-black opacity-100">{t.position}</span></td>
                <td colSpan="1" className=" text-center text-xs" >
                <span>{t.plannedentry}</span></td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.entry}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.tp}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.sl}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.exitdate}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.exit}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.mfe}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.mae}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.fgl}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.fees}</td>
                <td colSpan="1" className=" text-center text-xs" >
                  {
                    t.variables.map((v,i)=>(
                      v && <span>{v}, </span>
                    ))
                  }
                </td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.comments}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.tv}</td>
                
              </tr>
          ))
          :
          null
          }
        </tbody>

      </table> 

    </div>
  )
}

export default TradesList;