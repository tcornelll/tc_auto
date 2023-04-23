import { Box, Grid, Paper, Card, CardMedia, CardContent, Typography, CardHeader, ListItem, ListItemText, List, CardActions, Button } from '@mui/material'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { springUrl } from './CarGrid';
import { Buffer } from 'buffer';
import CarCardSubHeader from './CarCardSubHeader';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CenterFocusStrong } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
const stc = require('string-to-color');

export default function CarCard(props) {
    const navigate = useNavigate();
    const car = props.car;
    const isAdmin = props.isAdmin;
    const [mainImage, setMainImage] = useState();
    const color = stc(car.color);
    useEffect(() => {
      const getMainImage = async () => {
        try{
            const response = await axios({
                url: `${springUrl}image/${car.mainImageRef}`,
                method: 'GET',
            })
            const reader = new FileReader();
            let imageSource = response.data.image.data;
            var photo = response.data;
            let image = new Image();
            image.src = `data:${image.type};base64,${imageSource}`;
            setMainImage(image.src);

        }
        catch(error){
            console.error(error);
        }
      }
      getMainImage();
    
    }, [car.id, car.mainImageRef])

    async function handleDelete(e){
        try{
            const response = await axios.delete(`${springUrl}car?id=${car.id}`)
            console.log(response)
            if(response.status == 200){
                navigate(0);
            }
        }
        catch(error){
            console.error(error)
        }

    }
    

    return (
            <Card elevation={3} sx={{border:`3px solid ${color}`}}>
                <CardHeader
                    title={`${car.year} ${car.make} ${car.model}`}
                    subheader={<Typography>{<TimeToLeaveIcon sx={{marginBottom:-.6}}/>} {car.mileage}   {<AttachMoneyIcon sx={{marginBottom:-.6, marginRight:-1.1}}/>} {car.askingPrice}  {car.financing && <PaymentIcon sx={{marginBottom:-.6}}/>}</Typography>}
                />
                <CardMedia
                    component="img"
                    alt={`${car.year} ${car.make} ${car.model}`}
                    image={mainImage}
                    sx={{maxHeight:250}}
                />
                <CardContent sx={{textAlign:'center'}}>
                    <List sx={{textAlign:'center'}}>
                        {car.notes.map((note) =>(
                            <ListItem key={note}>
                                <ListItemText sx={{textAlign:'center'}}
                                    primary={note}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
                <CardActions>
                    {isAdmin && <Link to={`/edit`} state={{car: car}}>
                        <Button variant="outlined">Edit</Button>
                    </Link>}
                    {isAdmin && <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>}
                </CardActions>
            </Card>
    )
}
