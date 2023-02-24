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
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [edit, setEdit] = useState(false)

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

  const editTrade = props.editTrade

  const handleGeneralTabClick = () => {
    setGeneralTab(true)
    setVariablesTab(false)
  }
  const handleVariablesTabClick = () => {
    setGeneralTab(false)
    setVariablesTab(true)
  }

  const handleFormSubmit = () =>{
    if(!edit){
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
        if(!data.error){
          setFormData(formDataCopy)
          setSubmitSuccess(true)
          window.location.href = '/trades'
        }
        
        if(data.error && data.error.name === 'ValidationError'){
          setGeneralTab(true)
          setVariablesTab(false)
          setSubmitSuccess(false)
          setSubmitError(true)
        }
        
        //UPDATES setups after a set up is finished updating
      })
      .catch(error => {
      })

    }
    if(edit){
      fetch(`http://localhost:5000/trade-post`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(!data.error){
          setFormData(formDataCopy)
          setSubmitSuccess(true)
          window.location.href = '/trades'
        }
        
        if(data.error && data.error.name === 'ValidationError'){
          setGeneralTab(true)
          setVariablesTab(false)
          setSubmitSuccess(false)
          setSubmitError(true)
        }
        
        //UPDATES setups after a set up is finished updating
      })
      .catch(error => {
        console.log(error);
      })
    }
    
  }
  
  useEffect(()=>{
    console.log(formData);
    setTimeout(()=>{
      setSubmitSuccess(false)
    }, 5000)
    
    
  },[formData])
 

  

  useEffect(()=>{
    if(generalTab){
      generalTabRef.current.classList.add('bg-gray-400')
      //generalTabRef.current.classList.add('text-white')
      variablesTabRef.current.classList.remove('bg-gray-400')
      //variablesTabRef.current.classList.remove('text-white')
    }
    if(variablesTab){
      variablesTabRef.current.classList.add('bg-gray-400')
      //variablesTabRef.current.classList.add('text-white')
      generalTabRef.current.classList.remove('bg-gray-400')
      //generalTabRef.current.classList.remove('text-white')
    }
  },[generalTab, variablesTab])
  
  useEffect(()=>{
    console.log(editTrade);
    setFormDataCopy(formData)
  },[])

  useEffect(()=>{
    //if this route is triggered from edit button
    if(editTrade){
      setEdit(true)
      setFormData(editTrade)
    }

    console.log(formData);

    
  },[editTrade])
  
  return(
    <div className="new-trade-container  ">
      <div className="flex justify-between ">
        <div className="grid grid-cols-3 h-6 ">
          <button className="cols-span-1  h-6 pl-4 pr-4 text-xs 
          transition-all top-left-round top-right-round bg-opacity-70"
          onClick={handleGeneralTabClick} ref={generalTabRef}>General</button>
          <button className="cols-span-1  h-6 pl-4 pr-4 text-xs
          transition-all top-left-round top-right-round bg-opacity-70"
          onClick={handleVariablesTabClick} ref={variablesTabRef}>Variables</button>
          
        </div>
        
        <Dialog.Close asChild>
          <button className="h-6 text-md pl-4 pr-4 bg-gray-400 bg-opacity-70 text-white text-center
          font-bold top-right-round hover:text-black transition-all">x</button>
        </Dialog.Close>
      </div>
      {
        generalTab &&
        <NewTradeGeneral formDataContext={{formData, setFormData}} submitSuccess={submitSuccess}
        submitError={submitError}/>
      }

      {
        variablesTab &&
        <NewTradeVariables formDataContext={{formData, setFormData}}/>
      }

      <div className="grid grid-cols-2 items-center h-12 justify-end">
        <div className="flex justify-center items-center text-sm">
          <button className="" onClick={handleFormSubmit}>Save</button>
        </div>
        <Dialog.Close asChild>
          <div className="flex justify-center items-center text-sm">
            <button className="">Cancel</button>
          </div>
        </Dialog.Close>
      </div>
    </div>
  )
}

export default NewTrade;