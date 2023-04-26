import React from 'react'

import { springUrl } from './CarGrid'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { FormControlLabel, FormGroup, Checkbox, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function CreateCar() {
  const navigate = useNavigate();
    const [make, setMake] = useState("Kia");
    const [model, setModel] = useState("");
    const [mileage, setMileage] = useState(0);
    const [askingPrice, setAskingPrice] = useState(1000);
    const [financing, setFinancing] = useState(false);
    const [note, setNote] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState(2000);
    const [image, setImage] = useState();
    const [engineGrade, setEngineGrade] = useState("");
    const [heatingAndCoolingGrade, setHeatingAndCooling] = useState("");
    const [interiorGrade, setInterior] = useState("");


    function handleImageChange(e) {
      setImage(e.target.files[0]);
    }

    function handleAdd(e) {

      var car = {
        make: make,
        model: model,
        year: year,
        mileage: mileage,
        financing: financing,
        color: color, 
        askingPrice: askingPrice,
        engineGrade: engineGrade,
        heatingAndCoolingGrade: heatingAndCoolingGrade,
        interiorGrade: interiorGrade,
        note: note
      }


      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', image.name);
      formData.append('type', image.type);

      let newCar = JSON.stringify(car);
      var config = { headers: {'Content-Type': 'multipart/form-data'} };
      axios.post(`${springUrl}image`, formData, config)
      .then((response) => {
        let id = response.data;
        car.mainImageRef = id;
        axios.post(`${springUrl}car`, car)
        .then((response) => {
          console.log(response);
          if(response.status === 200){
            navigate("/home");
          }
        })
      });



      }

   return (
    <div>
      <h1>Add A Car For Sale</h1>
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
          <TextField id="note" label="Car Note" value={note} multiline rows={4} onChange={e => setNote(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} checked={financing} onChange={e => setFinancing(!financing)} label="Financing" />
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
      <input type="file" onChange={handleImageChange} />
      <img src={image}/>     
      <Button variant="outlined" onClick={handleAdd}>Add</Button>

    </div>
  )
}
