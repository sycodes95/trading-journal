import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';

import NewTradeGeneral from "./newTradeGeneral";

import NewTradeVariables from "./newTradeVariables";

function NewTrade (props) {
  const userName = props.username
  const [generalTab, setGeneralTab] = useState(true)
  const [variablesTab, setVariablesTab] = useState(false)

  const generalTabRef = useRef(null)
  const variablesTabRef = useRef(null)

  const handleGeneralTabClick = () => {
    setGeneralTab(true)
    setVariablesTab(false)
  }
  const handleVariablesTabClick = () => {
    setGeneralTab(false)
    setVariablesTab(true)
  }

  
  const [formData, setFormData] = useState({
    username: userName,
    open: true,
    entrydate: null,
    instrument: '',
    setup: '',
    position: '',
    plannedentry: null,
    entry: null,
    tp: null,
    sl: null,
    exitdate: '',
    exitprice: null,
    mfe: null,
    mae: null,
    fgl: null,
    fees: null,
    comments: '',
    tv: '',
    variables: [],
    public: false,
  })

  useEffect(()=>{
    console.log(formData);
  },[formData])

  useEffect(()=>{
    if(generalTab){
      generalTabRef.current.classList.add('bg-red-700')
      //generalTabRef.current.classList.add('shadow-red-300')
      generalTabRef.current.classList.add('text-white')
      variablesTabRef.current.classList.remove('bg-red-700')
      //variablesTabRef.current.classList.remove('shadow-red-300')
      variablesTabRef.current.classList.remove('text-white')
    }
    if(variablesTab){
      variablesTabRef.current.classList.add('bg-red-700')
      //variablesTabRef.current.classList.add('shadow-red-300')
      variablesTabRef.current.classList.add('text-white')
      generalTabRef.current.classList.remove('bg-red-700')
      //generalTabRef.current.classList.remove('shadow-red-300')
      generalTabRef.current.classList.remove('text-white')
    }
  },[generalTab, variablesTab])
  useEffect(()=>{
    console.log(props);
  },[])
  
  return(
    <div className="new-trade-container w-full ">
      <div className="flex justify-between ">
        <div className="grid grid-cols-2 h-6 ">
          <button className="cols-span-1  h-6 pl-4 pr-4 text-xs 
          transition-all top-left-round top-right-round "
          onClick={handleGeneralTabClick} ref={generalTabRef}>General Details</button>
          <button className="cols-span-1  h-6 pl-4 pr-4 text-xs
          transition-all top-left-round top-right-round"
          onClick={handleVariablesTabClick} ref={variablesTabRef}>Variable Details</button>
        </div>
        
        <Dialog.Close asChild>
          <button className="h-6 text-lg justify-self-center">x</button>
        </Dialog.Close>
      </div>

      {
        generalTab &&
        <NewTradeGeneral formDataContext={{formData, setFormData}}/>
      }

      {
        variablesTab &&
        <NewTradeVariables formDataContext={{formData, setFormData}}/>
      }

      

    </div>
  )
}


export default NewTrade;