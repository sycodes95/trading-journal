import moment from "moment";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";

function TradeDelete (props){

  const [itemDeleted, setItemDeleted] = useState(false)
  const {trades, setTrades} = props.tradesContext;
  const trade = props.deleteTrade;
  const username = props.username;
  const tradeIndex = props.tradeIndex
  /*
  const editTrades = () =>{
    let newTrades = trades;
    newTrades.splice(tradeIndex, 1)
    console.log(newTrades);
    setTrades(newTrades)
  }
  */

  const handleDelete = () =>{
    console.log(trades);
    fetch('http://localhost:5000/trade-delete', {
      method: 'DELETE',
      body: JSON.stringify(trade),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data =>{
      if(!data.error){
        
        setItemDeleted(true)
        setTimeout(()=>{
          window.location.href = '/trades'
        },500)
      }
      console.log(data);
      
    })
  }
  console.log(props);
  return(
    <div className="delete-trade-container  rounded-lg flex flex-col">
      <div className="h-full">
        <div className="text-center h-6 bg-yellow-300 grid grid-cols-3 items-center top-right-round top-left-round">
          <div className="col-span-1"></div>
          <div  className="text-sm col-span-1">
            <span>Delete Confirmation</span>
          </div>
          <div className="text-sm  col-span-1 flex justify-end">
            <Dialog.Close>
              <button className="w-6 font-bold">X</button>
            </Dialog.Close>
            
          </div>
          
        </div>
        <div className="text-center h-6 bg-white border-b border-gray-300 text-black flex items-center
        justify-center">
          <span className="text-xs ">Trade details</span>
        </div>
        <div className="w-full text-xs grid justify-center gap-y-2 pt-8 pb-8 h-full
        font-bold">
          <div>
            <span>ENTRY DATE: {moment(trade.entrydate).format("YYYY-MM-DD hh:mm")}</span>
          </div>
          <div>
            <span>STATUS: {trade.open ? 'Open' : 'Closed'}</span>
          </div>
          <div>
            <span>INSTRUMENT: {trade.instrument}</span>
          </div>
          <div>
            <span>SETUP: {trade.setup}</span>
          </div>
          <div>
            <span>POSITION: {trade.position}</span>
          </div>
          <div>
            <span>ENTRY: {trade.entry}</span>
          </div>
          {
            itemDeleted &&
            <div className="text-red-700">
              <span>Item has been permanently deleted</span>
            </div>
          }
        </div>
      </div>
      <div className="justify-self-center h-12 w-full mt-12 grid grid-cols-2 gap-y-10
      border-t border-gray-400 text-sm">
        <div className="flex justify-center items-center ">
          <button className="w-full h-full bottom-left-round hover:text-white
          hover:bg-red-700 hover:border-none transition-all" 
          onClick={handleDelete}>Delete</button>
        </div>
        <div className="flex justify-center items-center">
          <Dialog.Close className="w-full h-full bottom-right-round
          hover:bg-slate-300 transition-all">
            <button className="">Cancel</button>
          </Dialog.Close>
        </div>
      </div>
    </div>
  )
}

export default TradeDelete;