import { useEffect, useState } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Cars from './components/Cars'
import Login from './pages/Login'
import Register from "./pages/Register";
import Account from "./pages/Account";
import AddVehicle from "./components/AddVehicle";
import Reservations from "./components/Reservations";
import Reservation from "./components/Reservation";

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    console.log(username);
    console.log(userId);
});

  return (
    <Router>
      <Navbar username={username} setUsername={setUsername}/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/cars' element={<Cars userId={userId}/>} />
        <Route exact path='/login' element={<Login setUsername={setUsername} setUserId={setUserId}/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/account' element={<Account userId={userId}/>} />
        <Route exact path='/addvehicle' element={<AddVehicle userId={userId}/>} />
        <Route exact path='/reservations' element={<Reservations userId={userId}/>} />
        <Route exact path='/reservation' element={<Reservation userId={userId}/>} />

      </Routes>
    </Router>
  )
}

export default App
