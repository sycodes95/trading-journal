import { useEffect, useState } from "react";


function NtvVariables (props){
  const {formData, setFormData} = props.formDataContext
  const variableListIndex = props.index

  const [selectedVariable, setSelectedVariable] = useState(null)

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    
    if(value === ''){
      const variables = [...formData.variables];
      variables.splice(variableListIndex, 1)
      setFormData({ ...formData, variables });

    } else {
      const variables = [...formData.variables];
      variables[variableListIndex] = value;
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
        props.variableList &&
        <div className="grid grid-rows-2 justify-center">
          <label className="flex items-center">{`${props.variableList.title}`}</label>
          <div className="flex ">
            <select className="w-4" name="variables" onClick={handleInputChange}>
              <option value='' hidden></option>
              {
                props.variableList.variables.map((v) =>(
                  <option value={v}>{`${v}`}</option>
                ))
              }
            </select>
            <input className="border border-r-0 border-l-0 border-gray-300  top-left-round w-28 h-6"
            type='text' name="variables" value={formData.variables[variableListIndex]} onChange={handleInputChange}/>

          </div>
         
        </div>
      }
      
    </div>
  )
}

export default NtvVariables;