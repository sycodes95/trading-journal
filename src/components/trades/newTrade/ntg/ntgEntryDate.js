import { useEffect, useRef, useState } from "react";
import moment from "moment";
//PARENT -> newTradeGeneral

function NtgEntryDate(props){
  const {formData, setFormData} = props.formDataContext
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return(
    <div className=" pl-4 pr-4 grid grid-cols-1 pt-4 w-full ">
      
      <div className="grid grid-cols-2">
        <label className="text-white">Entry Date</label> 
        {
          !formData.entrydate && 
          <span className="text-red-700 text-xs justify-self-end">*</span>
        }
      </div>
      
      <input className="border border-gray-800 w-full top-left-round h-6 bg-black caret-white text-white" 
      type='datetime-local' name="entrydate" value={moment(formData.entrydate).format("YYYY-MM-DD hh:mm")} 
      onChange={handleInputChange}/>
      
    </div>
  )
}

export default NtgEntryDate;