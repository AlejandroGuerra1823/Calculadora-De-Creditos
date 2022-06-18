import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Inicio from "./components/Inicio";
import ListadoSimulador from "./components/ListadoSimulador";
import SimuladorCredito from "./components/SimuladorCredito";
// import SimuladorCredito from "./components/Simulador";
import QuienesSomos from "./components/QuienesSomos";
//import Pie from "./components/Pie";
import Banner from './components/Banner';

export default function App() {
  return(
    <div className='container-fluid p-0'>
      <Router>
          <Link to="/" className="btn btn-secondary mx-2 mt-3">Inicio</Link>
          <Link to="/QuienesSomos" className="btn btn-secondary mx-2 mt-3">Quienes Somos</Link>
          <Link to="/SimuladorCredito" className="btn btn-secondary mx-2 mt-3">Simulador de Crédito</Link>
          <Link to="/ListadoSimulador" className="btn btn-secondary mx-2 mt-3">Listado de Simulaciones</Link>

          <Routes>
              <Route path="/" element={<Inicio />}></Route>          
              <Route exact path="/QuienesSomos" element={<QuienesSomos />}></Route>          
              <Route exact path="/SimuladorCredito" element={<SimuladorCredito />}></Route>          
              <Route exact path="/ListadoSimulador" element={<ListadoSimulador />}></Route>          
          </Routes>
      </Router>
      
    </div>
  );
}

