import React from 'react'
import { Typography, Grid, Container, Box, Button, Card, CardContent, Rating, TextField } from '@mui/material'

function Rating_Booking() {
    const [value, setValue] = React.useState(2);
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0', width: '100%' }

    return (
        <Container maxWidth='xl'>
            <Typography variant='h5' color="white" marginTop={10} marginBottom={2} align='center'>
                Thank you for riding with us!
            </Typography>
            {/* Rectangle Booking */}
            <Typography variant='h5' color="white" marginTop={10} marginBottom={2} align='center'>
                We would appreciate if you could leave us a review!
            </Typography>
            <Rating
                name="rating"
                size="large"
                value={3}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
            {/* cant center. also anyway to make larger? */}
            <Typography variant='h5' color="white" marginTop={10} marginBottom={2} align='center'>
                and do you have any feedback for us?
            </Typography>
            <TextField
                style={textfieldstyle}
                id="outlined-multiline-static"
                align='center'
                multiline
                rows={10}
                placeholder="Leave us a Feedback!"
                variant="outlined"
            />
            {/* also cant center */}
        </Container>
    )
}

export default Rating_Booking