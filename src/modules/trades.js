import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewTrade from "./newTrade";
import TradingRules from "./tradingRules";
import * as Dialog from '@radix-ui/react-dialog';

import Modal from 'react-modal'


function Trades () {
  const [userInfo, setUserInfo] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  useEffect(()=>{
    modalIsOpen ? document.body.classList.add('overflowHidden') : document.body.classList.remove('overflowHidden')
  },[modalIsOpen])
 

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
    console.log(userInfo);
  },[userInfo])
  return(
    <Dialog.Root>
      <div className="relative  h-screen w-full  pt-8 p-12 " >
        <div className="text-3xl relative z-10 text-black font-bold pb-8 " >
          <span>Journal</span>
        </div>
        <div className="text-sm h-12 relative z-10">
          <Dialog.Trigger asChild>
           <button className="h-16 w-32 border border-black" onClick={()=> setModalIsOpen(true)}>New Trade</button>
          </Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay"/>
          <Dialog.Content className="DialogContent flex justify-center items-center">
            {userInfo && <NewTrade username={userInfo.username}/>}
          </Dialog.Content>
          <Dialog.Overlay/>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  )
}

export default Trades;