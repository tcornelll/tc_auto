import React from 'react'

import { springUrl } from './CarGrid'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { FormControlLabel, FormGroup, Checkbox, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';




export default function EditCar() {
    const location = useLocation()
    let car = location.state.car;
    const id = car.id;
    const navigate = useNavigate();

    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [mileage, setMileage] = useState(car.mileage);
    const [askingPrice, setAskingPrice] = useState(car.askingPrice);
    const [financing, setFinancing] = useState(car.financing);
    const [note, setNote] = useState(car.note);
    const [color, setColor] = useState(car.color);
    const [year, setYear] = useState(car.year);
    const [engineGrade, setEngineGrade] = useState(car.engineGrade);
    const [heatingAndCoolingGrade, setHeatingAndCooling] = useState(car.heatingAndCoolingGrade);
    const [interiorGrade, setInterior] = useState(car.interiorGrade)


    function handleUpdate(e) {


      var car = {
        id: id,
        make: make,
        model: model,
        year: year,
        mileage: mileage,
        financing: financing,
        color: color, 
        askingPrice: askingPrice,
        note: note,
        engineGrade: engineGrade,
        heatingAndCoolingGrade: heatingAndCoolingGrade,
        interiorGrade: interiorGrade
      }

      axios.put(`${springUrl}car`, car)
      .then((response) => {
        console.log(response);
        if(response.status === 200){
            navigate('/home')
        }
      });



      }

   return (
    <div>
      <h1>Edit Car</h1>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField id="year" label="Year" variant="outlined" value={year} onChange={e => setYear(e.target.value)}/>
        </Grid>
        <Grid item xs={4}>
          <TextField id="make" label="Make" variant="outlined" value={make} onChange={e => setMake(e.target.value)}/>
        </Grid>
        <Grid item xs={4}>
            <TextField id="model" label="Model" variant="outlined" value={model} onChange={e => setModel(e.target.value)}/>
        </Grid>
        <Grid item xs={4}>
          <TextField id="mileage" label="Mileage" type="number" variant="outlined" value={mileage} onChange={e => setMileage(e.target.value)}/>
        </Grid>
        <Grid item xs={4}>
          <TextField id="askingPrice" label="Asking Price" type="number" variant="outlined" value={askingPrice} onChange={e => setAskingPrice(e.target.value)}/>
        </Grid>
        <Grid item xs={4}>
            <TextField id="color" label="Color" variant="outlined" value={color} onChange={e => setColor(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField id="note" label="Car Note" value={note} multiline rows={4} onChange={(e) => setNote(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} checked={financing} onChange={e => setFinancing(!financing)} label="Financing" />
          </FormGroup>
        </Grid>
        <Grid item xs={4}>
          <FormGroup>
            <FormControl fullWidth>
              <InputLabel id="engineLabel">Engine Quality</InputLabel>
              <Select
                labelId='engineLabel'
                id='engineSelect'
                value={engineGrade}
                label="Engine Quality"
                onChange={(e) => setEngineGrade(e.target.value)}>
    
                <MenuItem value={"WORST"}>1  - Worst</MenuItem>
                <MenuItem value={"BAD"}>2 - Bad</MenuItem>
                <MenuItem value={"OK"}>3 - OK</MenuItem>
                <MenuItem value={"GOOD"}>4 - Good</MenuItem>
                <MenuItem value={"GREAT"}>5 - Great</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="heatingAndCoolLabel">A/C Quality</InputLabel>
              <Select
                labelId='heatingAndCoolLabel'
                id='heatnCoolSelect'
                value={heatingAndCoolingGrade}
                label="A/C Quality"
                onChange={(e) => setHeatingAndCooling(e.target.value)}>
    
                <MenuItem value={"WORST"}>1  - Worst</MenuItem>
                <MenuItem value={"BAD"}>2 - Bad</MenuItem>
                <MenuItem value={"OK"}>3 - OK</MenuItem>
                <MenuItem value={"GOOD"}>4 - Good</MenuItem>
                <MenuItem value={"GREAT"}>5 - Great</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="intLabel">Interior Quality</InputLabel>
              <Select
                labelId='intLabel'
                id='intSelect'
                value={interiorGrade}
                label="Interior Grade"
                onChange={(e) => setInterior(e.target.value)}>
    
                <MenuItem value={"WORST"}>1  - Worst</MenuItem>
                <MenuItem value={"BAD"}>2 - Bad</MenuItem>
                <MenuItem value={"OKAY"}>3 - OK</MenuItem>
                <MenuItem value={"GOOD"}>4 - Good</MenuItem>
                <MenuItem value={"GREAT"}>5 - Great</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>   
      <Button variant="outlined" onClick={handleUpdate}>Update</Button>

    </div>
  )
}
