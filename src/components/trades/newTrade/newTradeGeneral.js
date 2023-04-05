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
    
  },[formData])

  useEffect(()=>{
  },[])
  return(
    <div className="relative h-full text-xs  w-full ">
      <div className="h-full overflow-y-scroll overflow-x-hidden">
        
        <div className="grid grid-cols-2 max-width-300px-grid-cols-1 ">
          <div className="col-span-1 h-64 flex flex-col items-center">
            <NtgEntryDate  formDataContext={{formData, setFormData}}/>
            <NtgInstrument formDataContext={{formData, setFormData}}/>
            <NtgSetup formDataContext={{formData, setFormData}}/>
            <NtgPosition formDataContext={{formData, setFormData}}/>
          </div>
          <div className="col-span-1 h-64 flex flex-col items-center
          ">
            <NtgPlannedEntry formDataContext={{formData, setFormData}}/>
            <NtgEntry formDataContext={{formData, setFormData}}/>
            <NtgTakeProfit formDataContext={{formData, setFormData}}/>
            <NtgStoploss formDataContext={{formData, setFormData}}/>
          </div>

          <div className="col-span-1  border-gray-300 h-64 flex flex-col items-center ">
            <NtgExitDate formDataContext={{formData, setFormData}}/>
            <NtgExit formDataContext={{formData, setFormData}}/>
            <NtgGainLoss formDataContext={{formData, setFormData}}/>
            <NtgFees formDataContext={{formData, setFormData}}/>
            {
              props.submitSuccess && 
              <div className="flex justify-center items-center h-6">
                <span className="text-xs justify-self-center text-green-700">trade submitted!</span>
              </div>
              
            }
            {
              props.submitError && 
              <div className="flex justify-center items-center h-6">
                <span className="text-xs justify-self-center text-red-700">check required fields (*)</span>
              </div>
            }
            
          </div>

          <div className="col-span-1   bottom-right-round h-64 flex flex-col items-center">
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