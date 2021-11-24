import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
import { Login } from './Components/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
