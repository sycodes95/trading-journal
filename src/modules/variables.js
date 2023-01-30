import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import VariablesCards from "./variablesCards";
import VariableBoxSVG from "../icons/variable-box.svg"

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

  useEffect(()=>{
    console.log(variablesList);
  },[variablesList])

  return(
    <div className="variables-container w-full p-12 grid justify-center">
      <div className=" text-black  p-4 bg-orange-500 bg-opacity-80 rounded-sm
      e grid grid-rows-1 items-center ">
        <div className="row-start-1 col-span-1 ">
          <ReactSVG className="h-14 w-14 justify-self-center" src={VariableBoxSVG}/>
        </div>
        
        
        <div className="row-start-1 col-span-12">
          <div className="text-2xl">
            <span>Custom Variables</span>
          </div>
          <div className="text-sm pr-4">
            <span>
              Add and manage variable types. 
              Variables are important to track, and if used 
              correctly, will increase your edge.
            </span>

          </div>
         
        </div>
        
      </div>
      
      <div className="variables-cards-container grid grid-cols-4  h-full gap-x-12 
      2xl:grid-cols-5  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:grid sm:grid-cols-2
       mt-8 w-fit justify-self-center">
        {
          variablesList ?
          variablesList.map((list, index) =>(
            <div className="card col-span-1 ">
              <VariablesCards username={userInfo.username} index={index} 
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