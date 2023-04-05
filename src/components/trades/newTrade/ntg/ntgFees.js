import { useEffect, useRef, useState } from "react";

function NtgFees (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="fees-container pl-4 pr-4 grid grid-cols-1 pt-4  w-full">
      <label className="text-white">Fees</label>
      <input className="border border-gray-800 w-full top-left-round h-6 bg-black caret-white text-white" 
      type='number' name="fees" value={formData.fees} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgFees;