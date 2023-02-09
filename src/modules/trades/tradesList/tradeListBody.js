import moment from "moment";
import { useEffect, useRef, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { ReactSVG } from 'react-svg';
import { Triangle } from "react-loader-spinner";

import trashSVG from '../../../icons/trash.svg'
import editSVG from '../../../icons/edit.svg'

import TradeDelete from './tradeDelete';
import NewTrade from '../newTrade/newTrade';


function TradeListBody(props) {
  const userInfo = props.userInfo
  const isLoading = props.isLoading
  const {trades, setTrades} = props.tradesContext;
  

  return(
    <tbody className="bg-white">
      {
        isLoading ?
          <th colSpan='18' className="triangle-load max-w-1420px h-full flex items-center ">
            <Triangle  height="80" width="1420" color="#000000" ariaLabel="triangle-loading" wrapperStyle={{}}
            visible={true} /> 
          </th>
        :
        trades && 
        trades.map((t, i) =>( 
        <tr className={`trades-tr   h-4 text-white ${!t.fgl && 'font-black-outline'} 
        ${t.fgl && t.fgl > 0 && 'font-blue-outline'} ${t.fgl && t.fgl < 0 && 'font-red-outline'} `}>
          <td colSpan="1" className=" text-center text-xs text-black fill-current
          hover:cursor-pointer transition-all">
            <Dialog.Root>
              <Dialog.Trigger>
                <ReactSVG src={trashSVG} className="h-4 w-4"/>
              </Dialog.Trigger>
              <Dialog.Portal>
    
                <Dialog.Overlay className="DialogOverlay"/>
                <Dialog.Content className="DialogContent bg-white bg-opacity-80">
                  <TradeDelete deleteTrade={t} tradeIndex={i} 
                  tradesContext={{trades, setTrades}}/>
                  
                </Dialog.Content>
                <Dialog.Overlay/>
              </Dialog.Portal>

            </Dialog.Root>
          </td>

          <td colSpan="1" className=" text-center text-xs text-black flex items-center justify-center fill-current
          hover:cursor-pointer transition-all">
            <Dialog.Root>
              <Dialog.Trigger>
                <ReactSVG src={editSVG} className="h-4 w-4"/>
              </Dialog.Trigger>
              <Dialog.Portal>
    
                <Dialog.Overlay className="DialogOverlay"/>
                <Dialog.Content className="DialogContent bg-white bg-opacity-80">
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
          {t.open === 'OPEN' ? 'OPEN' : 'CLOSED'}</td>
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
          {moment(t.exitdate).format("YYYY-MM-DD hh:mm")}</td>
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
  )
}

export default TradeListBody;