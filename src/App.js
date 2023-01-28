import '../src/styles/App.css';

//--------------------------------------------------------------------------------------
import { HashRouter, BrowserRouter, Routes, Switch, Route } from "react-router-dom";
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


function App() {
  return (
    <BrowserRouter>
      <div className='app grid grid-cols-200px-1fr bg-white m-0'>
        <div className='cols-start-1 col-span-2 cols-end-3 rows-start-1 rows-end-2'>
          <Header/>
        </div>
        <div className='side cols-start-1 col-span-1 cols-end-2 rows-start-2 rows-end-3'>
          <Sidebar/>
        </div>
        <div className='content cols-start-2 col-span-1 cols-end-3 rows-start-2 rows-end-3 '>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
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
