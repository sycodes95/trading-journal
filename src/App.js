import '../src/styles/App.css';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
//--------------------------------------------------------------------------------------
import { HashRouter, BrowserRouter, Routes, Switch, Route, Redirect, useNavigate } from "react-router-dom";
//--------------------------------------------------------------------------------------

import Header from './components/header';

import Login from './components/login';
import Signup from './components/signup';
import Trades from './components/trades/trades';
import Profile from './components/profile';
import Sidebar from './components/sidebar';
import Setups from './components/setups/setups';
import Instruments from './components/instruments/instruments';
import Variables from './components/variables/variables';
import Logout from './components/logout';
import Dashboard from './components/dashboard/dashboard';

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
          <div className='max-950-hidden'>
            <Sidebar/>
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
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/trades" element={<Trades/>}/>
            <Route path="/profile" element={<Profile/>}/>
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
