import { useEffect, useRef, useState } from "react";

function NtgMAE (props){
  const {formData, setFormData} = props.formDataContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return(
    <div className="entry-container pl-4 pr-4 grid grid-cols-1 pt-4 ">
      <label className="text-white">MAE</label>
      <input className="border border-gray-800 w-32 top-left-round h-6 bg-black caret-white text-white" 
      type='number' name="mae" value={formData.mae} onChange={handleInputChange}/>
      
    </div>
  )
}
export default NtgMAE;