import './App.css';
import Main from './pages/Main';
import SelectOptions from './pages/SelectOptions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Daily from './pages/Daily';
import Hourly from './pages/Hourly';
import React from 'react';
import Temperature from './pages/Temperature';
import Ws from './pages/Ws';
import Rain from './pages/Rain';
import Rh from './pages/Rh';
import Wd from './pages/Wd';
import DB from './pages/EditDB';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/select/:cityName" element={<SelectOptions />} />
          <Route path="/Daily/:cityName" element={<Daily />} />
          <Route path="/Hourly/:cityName" element={<Hourly />} />
          <Route path="/Temperature/:cityName" element={<Temperature />} />
          <Route path="/Ws/:cityName" element={<Ws/>} />
          <Route path="/Rain/:cityName" element={<Rain/>} />
          <Route path="/Rh/:cityName" element={<Rh/>} />
          <Route path="/Wd/:cityName" element={<Wd/>} />
          <Route path="/DB/:cityName" element={<DB/>} />

        </Routes>
      </div>
    </Router>
   
 
  
 
  );
}

export default App;
