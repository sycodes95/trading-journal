import { useEffect, useRef, useState } from "react";

function NtgMFE (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="entry-container pl-4 pr-4 grid grid-cols-1 pt-4 ">
      <label>MFE</label>
      <input className="border border-r-0 border-l-0 border-gray-300 w-32 top-left-round h-6" 
      type='number' name="mfe" value={formData.mfe} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgMFE;