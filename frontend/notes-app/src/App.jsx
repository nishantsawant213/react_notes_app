import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SingUp/SignUp';
import Login from './pages/Login/Login';

const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />}></Route>
      <Route path='/login' exact element={<Login />}></Route>
      <Route path='/signup' exact element={<SignUp />}></Route>
    </Routes>
  </Router>
);


function App() {


  return (
    <div>
      {routes}
    </div>
  )
}

export default App
