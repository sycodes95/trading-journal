import { useEffect, useRef, useState } from "react";

//PARENT -> newTradeGeneral

function NtgExitDate(props){
  const {formData, setFormData} = props.formDataContext
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return(
    <div className=" pl-4 pr-4 grid grid-cols-1 pt-4 w-40">
      
      <div className="grid grid-cols-2 ">
        <label className="text-xs ">Exit Date</label> 
        
      </div>
      
      <input className=" border border-r-0 border-l-0 border-gray-300 top-left-round h-6" 
      type='datetime-local' name="exitdate" value={formData.exitdate} onChange={handleInputChange}/>
      
    </div>
  )
}

export default NtgExitDate;