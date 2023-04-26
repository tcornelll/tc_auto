import { Box, Card, CardActions, CardContent, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { springUrl } from './CarGrid';
import axios from 'axios';

export default function Login() {
    const [isAdmin, setIsAdmin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const acceptedPhrase = "password";
    const navigate = useNavigate();


    function handleClick(e){
        let user = {
            username: username,
            password: password
        }

        axios.get(`${springUrl}user`, user)
        .then((response) => {
          console.log(response);
          if(response.data === "admin"){
            sessionStorage.setItem('isAdmin', 'true');
          }
          else {
            sessionStorage.setItem('isAdmin', 'false')
          }
          navigate("/home");
        })
    }

  return (
    <Box sx={{margin:'auto'}}>
        <Card sx={{maxWidth:800}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h4'>Welcome to TC's Auto Market</Typography>
                If you are TC himself, put in the secret phrase to be able to add cars, delete them, and edit them. Otherwise, just click the "Continue" button to see what we have in Stock!
                <br/>
                <TextField id="loginField" label="Username" type="text" variant="outlined" value={username} onChange={e => setUsername(e.target.value)}/>
                <TextField id="passwordField" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </CardContent>
            <CardActions>
                <Link to="/home" state={{admin: isAdmin}}>
                    <Button onClick={handleClick} variant="outlined">Continue</Button>
                </Link>
            </CardActions>
        </Card>
    </Box>
    
  )
}
