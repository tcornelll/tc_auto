import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Box, Card } from '@mui/material';
import CarCard from './CarCard';

export const springUrl = 'http://localhost:8080/api/';

export default function CarGrid() {
    const [cars, setCars] = useState([]);
    useEffect(() => {
      const getAllCars = async () => {
          try{
            const response = await axios.get(`${springUrl}car`);
            console.log(response.data);
            setCars(response.data);
          }
          catch (error){
              console.error(error)
          }
      }
      getAllCars();
    }, [])
    
    return (
        <div>
            <Grid container alignItems="center" direction="column" columnSpacing="10px" sx={{width:"80%", margin:"auto", padding:"10px", backgroundColor:"gray"}}>
                {cars.map((car) => {
                    return (
                        <CarCard car={car} key={car.id}/>
                    )
                })}
            </Grid>
        </div>
    )   
}
