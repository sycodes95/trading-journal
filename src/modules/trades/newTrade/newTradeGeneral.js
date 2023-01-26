import { useEffect, useRef, useState } from "react";

import NtgInstrument from "./ntg/ntgInstrument";
import NtgSetup from "./ntg/ntgSetup";
import NtgEntryDate from "./ntg/ntgEntryDate";
import NtgPosition from "./ntg/ntgPosition";
import NtgPlannedEntry from "./ntg/ntgPlannedEntry";
import NtgEntry from "./ntg/ntgEntry";
import NtgStoploss from "./ntg/ntgStoploss";
import NtgTakeProfit from "./ntg/ntgTakeprofit";
import NtgExitDate from "./ntg/ntgExitDate";
import NtgExit from "./ntg/ntgExit";
import NtgGainLoss from "./ntg/ntgGainLoss";
import NtgFees from "./ntg/ntgFees";
import NtgMFE from "./ntg/ntgMFE";
import NtgMAE from "./ntg/ntgMAE";
import NtgOpen from "./ntg/ntgOpen";


//PARENT -> newTrade
//CHILDREN -> *Ntg___


function NewTradeGeneral (props){
  const {formData, setFormData} = props.formDataContext
  
  useEffect(()=>{
    console.log(formData);
  },[formData])

  useEffect(()=>{
  },[])
  return(
    <div className="new-trade-general text-xs w-full">
      <div className="new-trade-data ">
        <div className="bg-red-700 pl-4 pr-4 text-black text-center bottom-right-round
        transition-all">
          <span>Trade Data</span>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 border-b border-gray-300 h-64 ">
            <NtgEntryDate  formDataContext={{formData, setFormData}}/>
            <NtgInstrument formDataContext={{formData, setFormData}}/>
            <NtgSetup formDataContext={{formData, setFormData}}/>
            <NtgPosition formDataContext={{formData, setFormData}}/>
          </div>
          <div className="col-span-1 border-b border-r  border-gray-300 bottom-right-round h-64
          ">
            <NtgPlannedEntry formDataContext={{formData, setFormData}}/>
            <NtgEntry formDataContext={{formData, setFormData}}/>
            <NtgTakeProfit formDataContext={{formData, setFormData}}/>
            <NtgStoploss formDataContext={{formData, setFormData}}/>
          </div>

          <div className="col-span-1 border-b border-gray-300 h-64">
            <NtgExitDate formDataContext={{formData, setFormData}}/>
            <NtgExit formDataContext={{formData, setFormData}}/>
            <NtgGainLoss formDataContext={{formData, setFormData}}/>
            <NtgFees formDataContext={{formData, setFormData}}/>
            
          </div>

          <div className="col-span-1 border-b border-r  border-gray-300 bottom-right-round h-64">
            <NtgMFE formDataContext={{formData, setFormData}}/>
            <NtgMAE formDataContext={{formData, setFormData}}/>
            <NtgOpen formDataContext={{formData, setFormData}}/>
          </div>
          
        </div>
        
        
      </div>
    </div>
  )
}
export default NewTradeGeneral;