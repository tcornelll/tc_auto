import { Box, Grid, Paper, Card, CardMedia, CardContent, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { springUrl } from './CarGrid';
import { Buffer } from 'buffer';

export default function CarCard(props) {
    const car = props.car;
    const [mainImage, setMainImage] = useState();
    useEffect(() => {
      const getMainImage = async () => {
        try{
            const response = await axios({
                url: `${springUrl}car/${car.id}/image`,
                method: 'GET',
                responseType: 'blob'
            })
            const reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend = function () {
                const base64Data = reader.result;
                setMainImage(base64Data)
            }
        }
        catch(error){
            console.error(error);
        }
      }
      getMainImage();
    
    }, [car.id])
    

    return (
        <Grid item sx={{width:"80%", marginBottom:"10px"}}>
            <Card elevation={3} sx={{border:`3px solid ${car.color}`}}>
                <CardMedia
 
                    component="img"
                    alt={`${car.year} ${car.make} ${car.model}`}
                    image={mainImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {car.year} {car.make} {car.model}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
