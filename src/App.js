import '../src/styles/App.css';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
//--------------------------------------------------------------------------------------
import { BrowserRouter, Routes, Route} from "react-router-dom";
//--------------------------------------------------------------------------------------

import Header from './components/header';

import Login from './components/login';
import Signup from './components/signup';
import Trades from './components/trades/trades';

import Setups from './components/setups/setups';
import Instruments from './components/instruments/instruments';
import Variables from './components/variables/variables';

import Dashboard from './components/dashboard/dashboard';
import NavBar from './components/navbar';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    token && setUserLoggedIn(true)
    
  }, [])
  return (
    <BrowserRouter>
      <div className='app flex flex-col bg-dev-blue m-0 h-full'>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <div className='h-full bg-black bg-opacity-25'>
          <Header/>
        </div>
        {
          userLoggedIn &&
          <div className=''>
            <NavBar/>
          </div>
        }
        
        <div className='bg-dev-blue w-full'>
        

          
          <Routes>
            {
              userLoggedIn ?
              <Route exact path="/" element={<Dashboard/>}/>
              : 
              <Route exact path="/" element={<Login/>}/>
            }
            
            <Route path="/login" element={<Login/>}/>
            
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/trades" element={<Trades/>}/>
            <Route path="/setups" element={<Setups/>}/>
            <Route path='/instruments' element={<Instruments/>}/>
            <Route path='/variables' element={<Variables/>}/>
          </Routes>
            
          
          
       </div>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
