import '../src/styles/App.css';

//--------------------------------------------------------------------------------------
import { HashRouter, BrowserRouter, Routes, Switch, Route } from "react-router-dom";
//--------------------------------------------------------------------------------------

import Header from './modules/header';
import Footer from './modules/footer';
import Login from './modules/login';
import Signup from './modules/signup';
import Home from './modules/home';
import Trades from './modules/trades';
import Profile from './modules/profile';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>

          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/trades" element={<Trades/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
