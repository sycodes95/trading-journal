import { useEffect, useRef, useState } from "react";

function NtgMFE (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="entry-container pl-4 pr-4 grid grid-cols-1 pt-4 w-full">
      <label className="text-white">MFE</label>
      <input className="border border-gray-800 w-full top-left-round h-6 bg-black caret-white text-white" 
      type='number' name="mfe" value={formData.mfe} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgMFE;