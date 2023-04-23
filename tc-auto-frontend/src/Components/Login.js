import { Box, Card, CardActions, CardContent, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';

import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
    const [isAdmin, setIsAdmin] = useState(true);
    const [phrase, setPhrase] = useState("");
    const acceptedPhrase = "password";

    function handlePhraseChange(e){
        console.log("changing")
        setPhrase(e.target.value);
        
        
    }
    
    function handleClick(e){
        if(phrase === acceptedPhrase){
             setIsAdmin(true);
        }
    }

  return (
    <Box sx={{margin:'auto'}}>
        <Card sx={{maxWidth:800}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h4'>Welcome to TC's Auto Market</Typography>
                If you are TC himself, put in the secret phrase to be able to add cars, delete them, and edit them. Otherwise, just click the "Continue" button to see what we have in Stock!
                <br/>
                <TextField id="loginField" label="Passphrase" type="text" variant="outlined" value={phrase} onChange={e => handlePhraseChange(e)}/>
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
