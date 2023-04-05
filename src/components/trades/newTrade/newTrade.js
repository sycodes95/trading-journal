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
    variables: Array(20).fill({ title: '', variable: ''}),
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
      fetch(`${process.env.REACT_APP_API_HOST}/new-trade-post`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(data => {
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
      fetch(`${process.env.REACT_APP_API_HOST}/trade-post`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(data => {
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
    setTimeout(()=>{
      setSubmitSuccess(false)
    }, 5000)
    
    
  },[formData])
 

  

  useEffect(()=>{
    if(generalTab){
      generalTabRef.current.classList.add('bg-green-700')
      //generalTabRef.current.classList.add('text-white')
      variablesTabRef.current.classList.remove('bg-green-700')
      //variablesTabRef.current.classList.remove('text-white')
    }
    if(variablesTab){
      variablesTabRef.current.classList.add('bg-green-700')
      //variablesTabRef.current.classList.add('text-white')
      generalTabRef.current.classList.remove('bg-green-700')
      //generalTabRef.current.classList.remove('text-white')
    }
  },[generalTab, variablesTab])
  
  useEffect(()=>{
    setFormDataCopy(formData)
  },[])

  useEffect(()=>{
    //if this route is triggered from edit button
    if(editTrade){
      setEdit(true)
      setFormData(editTrade)
    }


    
  },[editTrade])
  
  return(
    <div className="new-trade-container relative bg-black bg-opacity-70 flex flex-col rounded-md">
      <div className="flex justify-between ">
        <div className="grid grid-cols-3 h-6 w-full  border-b-4 border-green-700 border-opacity-70">
          <button className="cols-span-1  h-6 pl-4 pr-4 text-xs 
          transition-all top-left-round top-right-round bg-opacity-70 text-white"
          onClick={handleGeneralTabClick} ref={generalTabRef}>General</button>
          <button className="cols-span-1  h-6 pl-4 pr-4 text-xs
          transition-all top-left-round top-right-round bg-opacity-70 text-white"
          onClick={handleVariablesTabClick} ref={variablesTabRef}>Variables</button>
          
        </div>
        
        <Dialog.Close asChild>
          <button className="h-6 text-md pl-4 pr-4 bg-green-700 bg-opacity-70 text-white text-center
          font-bold top-right-round hover:bg-opacity-50 transition-all">x</button>
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

      <div className="grid grid-cols-2 items-center h-12 w-full  border-t border-gray-800 text-white">
        <div className="flex justify-center items-center text-sm  h-full border-r border-gray-800
         ">
          <button className="h-full w-full hover:cursor-pointer bg-blue-400 bg-opacity-25 hover:bg-opacity-40 transition-all bottom-left-round"
           onClick={handleFormSubmit}>Save</button>
        </div>
        <Dialog.Close className="hover:cursor-pointer bg-red-400 bg-opacity-25 hover:bg-opacity-40 transition-all" asChild>
          <div className="flex justify-center items-center text-sm  h-full bottom-right-round">
            Cancel
          </div>
        </Dialog.Close>
      </div>
    </div>
  )
}

export default NewTrade;