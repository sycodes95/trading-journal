import '../src/styles/App.css';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
//--------------------------------------------------------------------------------------
import { HashRouter, BrowserRouter, Routes, Switch, Route, Redirect, useNavigate } from "react-router-dom";
//--------------------------------------------------------------------------------------

import Header from './modules/header';
import Footer from './modules/footer';
import Login from './modules/login';
import Signup from './modules/signup';
import Home from './modules/home';
import Trades from './modules/trades/trades';
import Profile from './modules/profile';
import Sidebar from './modules/sidebar';
import Setups from './modules/setups';
import Instruments from './modules/instruments';
import Variables from './modules/variables';
import Logout from './modules/logout';
import Dashboard from './modules/dashboard/dashboard';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    token && setUserLoggedIn(true)
    
  }, [])
  return (
    <BrowserRouter>
      <div className='app grid   bg-white m-0 h-screen'>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <div className='cols-start-1 col-span-2 cols-end-3 rows-start-1 rows-end-2 row-span-1'>
          <Header/>
        </div>
        {
          userLoggedIn &&
          <div className='side cols-start-1 col-span-1 cols-end-2 rows-start-2 rows-end-3'>
            <Sidebar/>
          </div>
        }
        
        <div className={`content ${userLoggedIn ? 'cols-start-2 col-span-1' : 'cols-start-1 col-span-2'} cols-end-3  rows-start-2 rows-end-3 bg-striped-content
        border-t border-l border-dashed border-gray-300`}>

          
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
