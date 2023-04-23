import React from 'react'

import { springUrl } from './CarGrid'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { FormControlLabel, FormGroup, Checkbox, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';




export default function EditCar() {
    const location = useLocation()
    let car = location.state.car;
    const id = car.id;
    const navigate = useNavigate();

    const [notesChanged, setNotesChanged] = useState(false);
    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [mileage, setMileage] = useState(car.mileage);
    const [askingPrice, setAskingPrice] = useState(car.askingPrice);
    const [financing, setFinancing] = useState(car.financing);
    const [numNotes, setNumNotes] = useState(0);
    const [notes, setNotes] = useState(car.notes);
    const [color, setColor] = useState(car.color);
    const [year, setYear] = useState(car.year);
    const [image, setImage] = useState();


    function handleImageChange(e) {
      console.log(e.target.files);
      setImage(e.target.files[0]);
    }

    function handleNoteChange(e){
        setNotesChanged(true);
        setNotes(e.target.value)
    }

    function handleUpdate(e) {
        var updatedNotes = ""
        if(notesChanged){
            var newNotes = notes;
            var updatedNotes = notes.split(",");
        }
        else {
            updatedNotes = notes;
        }


      var car = {
        id: id,
        make: make,
        model: model,
        year: year,
        mileage: mileage,
        financing: financing,
        color: color, 
        askingPrice: askingPrice,
        notes: updatedNotes
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
          <TextField id="notes" label="Car Notes here (comma separated)" value={notes} multiline rows={4} onChange={e => handleNoteChange(e)} />
        </Grid>
        <Grid item xs={4}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} checked={financing} onChange={e => setFinancing(!financing)} label="Financing" />
          </FormGroup>
        </Grid>
      </Grid>   
      <Button variant="outlined" onClick={handleUpdate}>Update</Button>

    </div>
  )
}
