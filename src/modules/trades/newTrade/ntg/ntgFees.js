import { useEffect, useRef, useState } from "react";

function NtgFees (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="fees-container pl-4 pr-4 grid grid-cols-1 pt-4  ">
      <label>Fees</label>
      <input className="border border-r-0 border-l-0 border-gray-300 w-32 top-left-round h-6" 
      type='number' name="fees" value={formData.fees} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgFees;