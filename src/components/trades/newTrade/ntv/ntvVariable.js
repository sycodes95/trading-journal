import { useEffect, useState } from "react";


function NtvVariables (props){
  const variableList = props.variableList
  const {formData, setFormData} = props.formDataContext
  const variableListIndex = props.index
  const [vIndex, setVIndex] = useState(null)
  const [selectedVariable, setSelectedVariable] = useState(null)

  const handleInputChange = (e, groupTitle) => {
    
    const { name, value } = e.target;
    if(value === '' || !value){
      const variables = [...formData.variables];
      variables.splice(variableListIndex, 1, {title: '', variable: ''})
      setFormData({ ...formData, variables });

    } else {
      const variables = [...formData.variables];
      variables[variableListIndex] = {title: groupTitle, variable: value};
      setFormData({ ...formData, variables });
    }
    
   
    //setFormData({ ...formData, [name]: [...formData.variables, value] });
  };

  useEffect(()=>{
    //setVariableListIndex(formData.variables.findIndex(obj => obj.title === variableList.title));
  },[formData.variables])

  useEffect(()=>{
    
    let selected = formData.variables.find(obj => obj.title === variableList.title);
    if(selected) setSelectedVariable(selected.variable)
    

  },[formData.variables, variableList])
  useEffect(()=>{
  },[vIndex])

  useEffect(()=>{

  },[selectedVariable])

  useEffect(()=> {
    console.log(variableList);
  },[formData])
  return(
    <div className="">
      {
        variableList &&
        <div className="grid grid-rows-2 justify-center">
          <label className="flex items-center w-28 overflow-hidden whitespace-nowrap text-white">
          {`${variableList.title}`}
          </label>
          <div className="flex justify-center">
            <select className="w-4 border border-gray-800 h-6 bg-black caret-white text-white" 
            name="variables" onClick={(e)=>handleInputChange(e, variableList.title)}>
              <option value='' hidden></option>
              {
                variableList.variables.map((v) =>(
                  <option className="text-lg" value={v}>{`${v}`}</option>
                ))
              }
            </select>
            {
              
              selectedVariable ?
              <input className="border border-gray-800 w-28 top-left-round h-6 bg-black caret-white text-white"
              type='text' name="variables" value={selectedVariable} 
              onChange={(e)=>handleInputChange(e, variableList.title)}/>
              :
              

              <input className="border border-gray-800 w-28 top-left-round h-6 bg-black caret-white text-white"
              type='text' name="variables" value='' 
              onChange={(e)=>handleInputChange(e, variableList.title)}/>

            } 
            

          </div>
         
        </div>
      }
      
    </div>
  )
}

export default NtvVariables;