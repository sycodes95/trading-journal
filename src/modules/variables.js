import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import VariablesCards from "./variablesCards";

function Variables (){
  const [userInfo, setUserInfo] = useState(null)

  const [variablesList, setVariablesList] = useState(null)

  


  function getVariablesList (){
    
    if(userInfo){
      fetch(`http://localhost:5000/get-variables-list?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) => {
        
        let listVariables = data.listVariables;
        console.log(data.listVariables);
        let list = Array(20).fill(null)
        if(listVariables.length > 0){
          listVariables.forEach((variable) =>{
            list.splice(variable.listIndex, 1, variable)
          })
          
          setVariablesList(list)
        } else {
          setVariablesList(list)
        }
        
      })


    }
    
  }
 

  
  useEffect(()=>{
    
    //get variablelist from db
    getVariablesList()
  }, [userInfo])

  useEffect(()=>{
    
    //Token
    const token = JSON.parse(localStorage.getItem('token'))
    
    if(token) {
      fetch('http://localhost:5000/verifytoken', {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
        if(data.user.user){
          setUserInfo(data.user.user)
          
        }
      })
      
      .catch(error => console.error(error))
      }
  }, [])

  return(
    <div className="variables-container w-full p-12 grid ">
      <div className="text-3xl text-black font-bold pb-8 ">
        <span>Custom Variables</span>
      </div>
      <div className="text-sm h-12">
        <span>
          Add and manage variable types. 
          Variables are important to track, and if used 
          correctly, will increase your edge.
        </span>
      </div>
      <div className="variables-cards-container grid grid-cols-4  h-full gap-x-12 
      2xl:grid-cols-5  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:grid sm:grid-cols-2
      gap-y-6 mt-8 w-fit justify-self-center">
        {
          variablesList ?
          variablesList.map((list, index) =>(
            <div className="card col-span-1 ">
              <VariablesCards userInfo={userInfo} index={index} 
               variablesList={variablesList}/>
              
            </div>
          ))
          :
          null
        }
      </div>
    </div>
  )
}

export default Variables;