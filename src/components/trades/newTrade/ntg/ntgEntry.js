import { useEffect, useRef, useState } from "react";

function NtgEntry (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="entry-container pl-4 pr-4 grid grid-cols-1 pt-4 w-40 ">
      <div className="flex justify-between">
        <label className="text-white">Entry Price</label>
        {
          !formData.entry && <span className="text-red-700">*</span>
        }
      </div>
      
      <input className="border border-gray-800 w-32 top-left-round h-6 bg-black caret-white text-white" 
      type='number' name="entry" value={formData.entry} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgEntry;