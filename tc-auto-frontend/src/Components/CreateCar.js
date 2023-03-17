import React from 'react'

import { springUrl } from './CarGrid'
import { useState } from 'react'
import TextField from '@mui/material/TextField';



export default function CreateCar() {
    const [make, setMake] = useState("Kia");
    const [model, setModel] = useState("");
    const [mileage, setMileage] = useState(0);
    const [askingPrice, setAskingPrice] = useState(1000);
    const [financing, setFinancing] = useState(false);
    const [notes, setNotes] = useState([]);
    const [color, setColor] = useState("");
    const [year, setYear] = useState(2000);


   return (
    <div>
        <h1>Add a Car</h1>
        <TextField id="year" label="Year" variant="outlined" value={year} onChange={e => setYear(e.target.value)}/>
        <TextField id="make" label="Make" variant="outlined" value={make} onChange={e => setMake(e.target.value)}/>
        <TextField id="model" label="Model" variant="outlined" value={model} onChange={e => setModel(e.target.value)}/>
    </div>
  )
}
