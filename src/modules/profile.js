import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function Profile () {
  

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    
    if(token) {
      fetch('http://localhost:5000/verifytoken', {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}`}
      })
      .then(response => response.json())
      .then((data) => {
          
      })
      .catch(error => console.error(error))
      }
  }, [])
  return(
    <div className="w-full flex justify-center items-center">
      
      <table className="m-4 h-96 w-full border border-black overflow-y-auto">
        <tr className="border-b border-black">
            <th colSpan="1" className="border-r border-gray-500  w-16">
              <div>asdasd</div>
            </th>
            <th colSpan="1" className="border-r border-gray-500  w-16"><div>asdasd</div></th>
            <th className="w-16"><div>asdasd</div></th>
        </tr>
    
      
        <tr className="border-gray-300 border-b h-4">
          <td colSpan="1" className="" >asdasd</td>
          <td colSpan="1" className="" >
              <input className="h-4" type='checkbox' name="active" defaultChecked/>
          </td>
          <td colSpan='8' className="" >
              <span>asdsadsad</span>
              <button className="text-red-700 text-md font-bold hover:text-black transition-colors delay-100">x</button>
          </td>
        </tr>
      </table>
      
    </div>
  )
}


export default Profile;