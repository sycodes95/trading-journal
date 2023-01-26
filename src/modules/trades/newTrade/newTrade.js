import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';

import NewTradeGeneral from "./newTradeGeneral";

import NewTradeVariables from "./newTradeVariables";

function NewTrade (props) {
  const userName = props.username
  const [generalTab, setGeneralTab] = useState(true)
  const [variablesTab, setVariablesTab] = useState(false)
  const [formDataCopy, setFormDataCopy] = useState(null)
  

  const [formData, setFormData] = useState({
    username: userName,
    open: '',
    entrydate: '',
    instrument: '',
    setup: '',
    position: '',
    plannedentry: '',
    entry: '',
    tp: '',
    sl: '',
    exitdate: '',
    exit: '',
    mfe: '',
    mae: '',
    fgl: '',
    fees: '',
    comments: '',
    tv: '',
    variables: [],
    public: false,
  })

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

  const handleFormSubmit = () =>{
    fetch(`http://localhost:5000/new-trade-post`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      !data.error && setFormData(formDataCopy) 
      //UPDATES setups after a set up is finished updating
    })
    .catch(error => {
    })
  }

  

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
    setFormDataCopy(formData)
  },[])
  
  return(
    <div className="new-trade-container ">
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
          <button className="h-6 text-md pl-4 pr-4 bg-red-700 text-white text-center
          font-bold top-right-round">x</button>
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

      <div className="grid grid-cols-2 items-center h-12">
        

        <div className="flex justify-center items-center text-sm">
          <button className="" onClick={handleFormSubmit}>Save</button>
        </div>
        <Dialog.Close asChild>
          <div className="flex justify-center items-center text-sm">
            <button className="">Cancel</button>
          </div>
        </Dialog.Close>
      </div>
      <div>{`${formData.open}`}</div>
    </div>
  )
}


export default NewTrade;