import { useEffect, useRef, useState } from "react";
import moment from "moment";

import { ReactSVG } from "react-svg";
import { Triangle } from "react-loader-spinner";
import * as Dialog from '@radix-ui/react-dialog';

import editSVG from "../../../icons/edit.svg"

import NewTrade from "../newTrade/newTrade";

function TradesList(props){
  const userInfo = props.userInfo
  const [trades, setTrades] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const tableRef = useRef(null);

  const tradeTrRef = useRef(null)

  const tableHeaders = [
    'ENTRY DATE', 'STATUS', 'INSTRUMENT',
    'SETUP', 'POSITION', 'P ENTRY', 
    'ENTRY', 'TP', 'SL', 
    'EXIT DATE', 'EXIT', 'MFE', 
    'MAE', 'GAIN/LOSS', 'FEES', 
    'VARIABLES', 'COMMENTS', 'LINKS', 
  ] 

  const fetchTrades = () => {
    
    setIsLoading(true)
    
    setTimeout(()=>{
      if(userInfo && userInfo.username){
        fetch(`http://localhost:5000/trades-get?username=${userInfo.username}`)
        .then(response => response.json())
        .then((data) =>{
          console.log(data);
          setTrades(data.trades)
          setIsLoading(false)
        })
 
      }
  },1069)

  }

  const handleWheelScroll = (e) => {
    e.preventDefault();
    // Get the current scroll position
    const { scrollLeft } = tableRef.current;
    // Calculate the new scroll position based on the mouse wheel event
    const newScrollLeft = scrollLeft + e.deltaY;
    // Update the scroll position
    tableRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }

  const handleTradeColor = (e) =>{
    console.log(e);
  }
   
  useEffect(()=>{
    fetchTrades()
  },[userInfo])
  return(
    <div className="trade-table-con scrollbar-color max-w-1420px min-h-600px max-h-screen overflow-auto relative z-10" ref={tableRef} onWheel={handleWheelScroll}>
        
      <table className="">
        <thead>
            {
              isLoading ?
              <tr className=" text-white text-xs font-bold ">
                <th colSpan="1" className=" th-wrapper-start hover:text-desert hover:cursor-pointer transition-all">
                  <div className="h-4 slant-start pl-4 pr-4 bg-striped"></div>
                </th>
              </tr>
              :
              <tr className=" text-white text-xs font-bold ">
                <th colSpan="1" className=" th-wrapper-start hover:text-desert hover:cursor-pointer transition-all">
                  <div className="h-4 slant-start pl-4 pr-4 bg-striped"></div>
                </th>
                <th colSpan="1" className=" th-wrapper-start hover:text-desert hover:cursor-pointer transition-all">
                  <div className="h-4 slant-right pl-4 pr-4 bg-striped">#</div>
                </th>
                {
                  tableHeaders.map((h, i) =>(
                    <th colSpan="1" className="th-wrapper hover:text-desert hover:cursor-pointer transition-all">
                      <div className="h-4 slant-right pl-4 pr-4 bg-striped min-w-max ">{h}</div> 
                    </th>

                  ))
                } 
              </tr>
            }
        </thead>
        <tbody>
          {
            isLoading ?
              <th colSpan='18' className="triangle-load max-w-1420px h-full flex items-center ">
                <Triangle  height="80" width="1420" color="#000000" ariaLabel="triangle-loading" wrapperStyle={{}}
                visible={true} /> 
              </th>
          
            :
            trades && 
            trades.map((t, i) =>( 
            <tr className={`trades-tr border-gray-300  h-4 text-white ${!t.fgl && 'font-black-outline'} 
            ${t.fgl && t.fgl > 0 && 'font-blue-outline'} ${t.fgl && t.fgl < 0 && 'font-red-outline'} outline-1 outline`}>
              <td colSpan="1" className=" text-center text-xs text-black flex items-center justify-center fill-current
              hover:cursor-pointer transition-all">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <ReactSVG src={editSVG} className="h-4 w-4"/>
                  </Dialog.Trigger>
                  <Dialog.Portal>
        
                    <Dialog.Overlay className="DialogOverlay"/>
                    <Dialog.Content className="DialogContent ">
                      {
                      userInfo && <NewTrade username={userInfo.username} editTrade={t}/>
                      }
                    </Dialog.Content>
                    <Dialog.Overlay/>
                  </Dialog.Portal>

                </Dialog.Root>
                
                
                
              </td>
              <td colSpan="1" className=" text-center text-xs" >
              {i + 1}</td>
              <td colSpan="1" className=" text-center text-xs " >
              {moment(t.entrydate).format("YYYY-MM-DD hh:mm")}</td>
              <td colSpan="1" className=" text-center text-xs" >
              {t.open ? 'open' : 'closed'}</td>
              <td colSpan="1" className=" text-center text-xs " >
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
              <td colSpan="1" className=" text-center text-xs">
              {t.fgl}</td>
              <td colSpan="1" className=" text-center text-xs" >
              {t.fees}</td>
              <td colSpan="1" className=" text-center text-xs">
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
          
          }
        </tbody>

      </table> 
      

    </div>
  )
}
export default TradesList;