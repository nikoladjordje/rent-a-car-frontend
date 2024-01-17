import { useEffect, useState } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Cars from './components/Cars'
import Login from './pages/Login'

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
        <Route exact path='/cars' element={<Cars/>} />
        <Route exact path='/login' element={<Login setUsername={setUsername} setUserId={setUserId}/>} />

      </Routes>
    </Router>
  )
}

export default App
