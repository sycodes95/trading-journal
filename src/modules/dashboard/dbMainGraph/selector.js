import { useEffect, useState } from "react"

function GraphSelector (props) {
  const userInfo = props.userInfo
  const {trades, setTrades} = props.tradesContext

  const [variablesList, setVariablesList] = useState(null)

  const getVariableList = () =>{
    fetch(`http://localhost:5000/get-variables-list?username=${userInfo.username}`)
      .then(response => response.json())
      .then((data) =>{
        
        if(!data.error){
          console.log(data);
          setVariablesList(data.listVariables)
          
        }
      })
  }

  useEffect(()=>{
    if(userInfo && userInfo.username){
      getVariableList()
    }
    
  },[userInfo])

  useEffect(()=>{
    console.log(variablesList);
  },[variablesList])

  return(
    <div className="grid">

    </div>
  )
}

export default GraphSelector