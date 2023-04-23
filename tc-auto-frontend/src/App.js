import { Box } from '@mui/material';
import './App.css';
import CarGrid from './Components/CarGrid';
import CreateCar from './Components/CreateCar';
import { Routes, Route } from 'react-router-dom';
import EditCar from './Components/EditCar';
import Login from './Components/Login';


function App() {
  return (
    <Routes>
      <Route path="/home" element={<CarGrid/>} />
      <Route path="/create" element={<CreateCar/>} />
      <Route path="/edit" element={<EditCar/>} />
      <Route path="/" element={<Login/>} />
    </Routes>
  );
}

export default App;
