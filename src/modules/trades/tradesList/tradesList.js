import { useEffect, useRef, useState } from "react";
import moment from "moment";

function TradesList(props){
  const userInfo = props.userInfo
  const [trades, setTrades] = useState(null)

  let dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
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
    <div className="w-full  overflow-y-auto">
      <table className=" w-full ">
        <thead>
            <tr className="bg-red-700 text-black text-xs font-bold">
                <th colSpan="1" className="border-r border-white  w-2 font-thin">#</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Entry Date</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Status</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Instrument</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Setup</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Position</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Planned Entry</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Entry</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">TP</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">SL</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Exit Date</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Exit</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">MFE</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">MAE</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Gain / Loss</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Fees</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Variables</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Comments</th>
                <th colSpan="1" className="border-r border-white  w-fit font-thin">Picture Links</th>
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
                {t.position}</td>
                <td colSpan="1" className=" text-center text-xs" >
                {t.plannedentry}</td>
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