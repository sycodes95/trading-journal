import { useEffect, useRef, useState } from "react";

function NtgPlannedEntry (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="planned-entry-container pl-4 pr-4 grid grid-cols-1 pt-4 w-40">
      <label>Planned Entry</label>
      <input className="border border-r-0 border-l-0 border-gray-300  top-left-round h-6" 
      type='number' name="plannedentry" value={formData.plannedentry} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgPlannedEntry;