import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Box, Card, Button } from '@mui/material';
import CarCard from './CarCard';
import { useNavigate, Link, location, useLocation } from 'react-router-dom';

export const springUrl = 'http://localhost:8080/api/';

export default function CarGrid() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cars, setCars] = useState([]);
    const isAdmin = true//JSON.parse(sessionStorage.getItem('isAdmin'));
    //console.log(isAdmin)
    useEffect(() => {
      const getAllCars = async () => {
          try{
            const response = await axios.get(`${springUrl}car`);
            setCars(response.data);
          }
          catch (error){
              console.error(error)
          }
      }
      getAllCars();
    }, [])

    function CreateLink(props){
        if(isAdmin){
            <Link to="/create">
                <Button variant="outlined" color="primary" sx={{marginLeft:'50%', marginTop:'40px'}}>New Car</Button>
            </Link>
        }
        
    } 
    
    return (
        <div>
            <Grid container justifyContent={"center"} alignItems={"center"} spacing={3}>
                {cars.map((car) => {
                    return (
                        <Grid item marginLeft={5} marginRight={5} xs={12} md={4}>
                            <CarCard car={car} key={car.id}/>                            
                        </Grid>
                    )
                })}
            </Grid>
            {isAdmin &&
                <Link to="/create">
                    <Button variant="outlined" color="primary" sx={{marginLeft:'50%', marginTop:'40px'}}>New Car</Button>
                </Link>
            }
        </div>
    )   
}
