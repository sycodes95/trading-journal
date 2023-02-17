import { useEffect, useState } from "react";


function NtvVariables (props){
  const variableList = props.variableList
  const {formData, setFormData} = props.formDataContext
  const variableListIndex = props.index

  const [selectedVariable, setSelectedVariable] = useState(null)

  const handleInputChange = (e, groupTitle) => {
    
    const { name, value } = e.target;
    console.log(groupTitle);
    if(value === ''){
      const variables = [...formData.variables];
      variables.splice(variableListIndex, 1)
      setFormData({ ...formData, variables });

    } else {
      const variables = [...formData.variables];
      variables[variableListIndex] = {title: groupTitle, variable: value};
      console.log(value);
      setFormData({ ...formData, variables });
    }
    
   
    //setFormData({ ...formData, [name]: [...formData.variables, value] });
  };

  useEffect(()=>{
    console.log(formData.variables);
  },[formData.variables])

  return(
    <div className="">
      {
        variableList &&
        <div className="grid grid-rows-2 justify-center">
          <label className="flex items-center text-black w-28 overflow-hidden whitespace-nowrap">{`${variableList.title}`}</label>
          <div className="flex justify-center">
            <select className="w-4" name="variables" onClick={(e)=>handleInputChange(e, variableList.title)}>
              <option value='' hidden></option>
              {
                variableList.variables.map((v) =>(
                  <option className="text-lg" value={v}>{`${v}`}</option>
                ))
              }
            </select>
            {
              
              formData.variables[variableListIndex] ?
              <input className="border border-r-0 border-l-0 border-gray-300  top-left-round w-28 h-6"
              type='text' name="variables" value={formData.variables[variableListIndex].variable} 
              onChange={(e)=>handleInputChange(e, variableList.title)}/>
              :
              

              <input className="border border-r-0 border-l-0 border-gray-300  top-left-round w-28 h-6"
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