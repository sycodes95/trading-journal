import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import VariablesCards from "./variablesCards";
import VariablesSVG from "../../icons/variables.svg"
import VariablesArchive from "./variablesArchive";

function Variables (){
  const [userInfo, setUserInfo] = useState(null)

  const [variablesList, setVariablesList] = useState(null)

  const [viewArchive, setViewArchive] = useState(false)

  function getVariablesList (){
    
    fetch(`http://localhost:5000/get-variables-list?username=${userInfo.username}`)
    .then(response => response.json())
    .then((data) => {
      
      let listVariables = data.listVariables;

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

  const handleViewArchive = () => {
    setViewArchive(!viewArchive)
  }
  
  useEffect(()=>{
    userInfo && getVariablesList()
  }, [userInfo])

  useEffect(()=>{
    console.log(viewArchive);
  },[viewArchive])

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
    <div className="variables-container p-12 flex justify-center">
      <div className="w-10/12 flex flex-col">
        <section className="section-info text-white p-4 bg-black bg-opacity-40 rounded-sm
        grid items-center">
          <div className="">
            <ReactSVG className="h-14 w-14 text-white fill-current" src={VariablesSVG}/>
          </div>
          
          
          <div className="pl-8">
            <div className="text-2xl">
              <span>Custom Variables</span>
            </div>
            <div className="text-sm">
              <span>
                Add and manage variable types. 
                Variables are important to track, and if used 
                correctly, will increase your edge.
              </span>
            </div>
          </div>
          
        </section>

        <section className="flex">
          <div className="variables-cards-container h-full gap-x-12 
          flex flex-wrap justify-center
          mt-8 w-fit bg-black bg-opacity-25 pb-6">
            {
              variablesList &&
              variablesList.map((list, index) =>(
                <div className="card ">
                  <VariablesCards username={userInfo.username} index={index} 
                  variablesList={variablesList}/>
                  
                </div>
              ))
              
            }
          </div>
        </section>

        <div className="pt-12 w-full flex justify-center ">
          <button className="border border-gray-400 bg-white rounded-md text-sm pl-1 pr-1 hover:bg-gray-300 transition-colors" onClick={handleViewArchive}>
            VIEW ARCHIVED
          </button>
          
        </div>
        <div className="relative">
          {
            viewArchive && 
            <VariablesArchive username={userInfo.username}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Variables;