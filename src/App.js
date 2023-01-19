import '../src/styles/App.css';

//--------------------------------------------------------------------------------------

import Header from './modules/header';
import Footer from './modules/footer';
import Login from './modules/login';
import Signup from './modules/signup';

import { HashRouter, BrowserRouter, Routes, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>

          <Routes>

            <Route path="/login" exact element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            
          </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
