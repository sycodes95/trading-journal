import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function VariablesCards (props){
  
  const cardIndex = props.index
  
  const [userInfo, setUserInfo] = useState(null)

  const [titleEmpty, setTitleEmpty] = useState(true)

  const [variablesListExists, setVariablesListExists] = useState(false)
  
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    variables: [''],
    listIndex: null
  })

  const handleAddVariable = () =>{
    setFormData({ ...formData, variables: [...formData.variables, '']})
  }

  const handleInputChange = (e,index ) => {
    
    const { name, value } = e.target;
    
    if(name == 'variables'){
      //if handling variables input change
      const variables = [...formData.variables];
      variables[index] = value;
      setFormData({ ...formData, variables });
      
    } else {
      //if handling title input change
      setFormData({ ...formData, [name]: value });
    }
    
  };

  const handleKeyDownSubmit = (e) =>{
    if(e.key === 'Enter' && formData.title !== ''){
      
      fetch('http://localhost:5000/new-variables-list', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      })
    }
  }

  useEffect(()=>{
    
  },[props.variablesListContext])
  
  useEffect(()=>{
    
    if(props.variablesList[cardIndex] !== null){
      let data = props.variablesList[cardIndex]
      console.log(data);
      setFormData({
        username: data.username,
        title: data.title,
        variables: data.variables,
        listIndex: data.listIndex 
      }) 
    }
  }, [props.variablesList]) 
  
  

  return(
    <div className="variables-card w-64 h-auto text-sm ">
      <div className="flex items-center justify-between border-b h-6">
        <div className="top-left-round bg-red-700 w-full h-full text-white text-xs font-thin  pl-1 pr-1
        flex items-center">
          <input className="top-left-round bg-red-700 focus2 border-steel-blue focus:bg-white focus:text-black 
           w-full" type='text' name="title" value={formData.title} 
          onChange={(e)=>handleInputChange(e)} onKeyDown={handleKeyDownSubmit} placeholder='Custom Variable Title...' />
          
          
          
        </div>
        

        <button className="bottom-right-round bg-steel-blue h-full text-white text-xs  w-24" 
        onClick={handleAddVariable}>Add Variable</button>
      </div>
      <div className="variables-list ">
        {
          
          formData.variables.map((v,index) =>(
            <div className="bottom-right-round variable flex items-center justify-between
            border-r-gray-300 border border-b-gray-300 pl-2">
              <input className=" w-full h-full  text-sm font-thin rounded-none pl-2 "
              type='text' name="variables" value={formData.variables[index]} 
              onChange={(e)=>handleInputChange(e,index)} onKeyDown={handleKeyDownSubmit} placeholder='Variable...' />
              
              <button className=" text-red-700 text-xs p-2 w-8 font-bold" >x</button>
            </div>
          ))
          
        }
      </div>
    </div>
  )
}

export default VariablesCards;