import { useEffect, useRef, useState } from "react";
import NtvVariables from "./ntv/ntvVariable";

function NewTradeVariables (props){


  const {formData, setFormData} = props.formDataContext

  const [variables, setVariables] = useState(null)
  

  const getVariables = () =>{
    fetch(`${process.env.REACT_APP_API_HOST}/get-variables-list?username=${formData.username}`)
    .then(response => response.json())
    .then((data) =>{
      setVariables(data.listVariables)
      
    })
  }
  useEffect(()=>{
  },[variables])


  useEffect(()=>{
    getVariables()
  },[formData.username])
  return(
    <div className="new-trade-variables relative h-full  text-xs w-full">
      <div className="h-full overflow-y-scroll flex justify-center ">
        
        <div className="new-trade-variables-container flex flex-wrap justify-between p-4 h-full">
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