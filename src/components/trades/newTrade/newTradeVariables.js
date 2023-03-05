import { useEffect, useRef, useState } from "react";
import NtvVariables from "./ntv/ntvVariable";

function NewTradeVariables (props){


  const {formData, setFormData} = props.formDataContext

  const [variables, setVariables] = useState(null)
  

  const getVariables = () =>{
    fetch(`http://localhost:5000/get-variables-list?username=${formData.username}`)
    .then(response => response.json())
    .then((data) =>{
      console.log(data);
      setVariables(data.listVariables)
      
    })
  }
  useEffect(()=>{
    console.log(variables);
  },[variables])


  useEffect(()=>{
    getVariables()
  },[formData.username])
  return(
    <div className="new-trade-variables text-xs w-full">
      <div className="">
        <div className="bg-gray-400 bg-opacity-70 pl-4 pr-4 text-black text-center bottom-right-round
        transition-all">
          <span>Variables Data</span>
        </div>
        <div className="new-trade-variables-container grid grid-cols-2  pt-4 h-full">
          {
            variables && 
            variables.map((v, index) =>(
              <NtvVariables variableList={v} index={index} formDataContext={{formData, setFormData}}/>
            ))
          }
          
        </div>
        
      </div>
    </div>
  )
}

export default NewTradeVariables;