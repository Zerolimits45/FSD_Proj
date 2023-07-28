import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import http from '../../http'

function Registered_Cars() {
    const cardStyle = { width: '100%', marginTop: 10 }
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
    const carTitle = { color: "#150039", fontWeight: "bold" }
    

    //fetching car list
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        http.get('/car/user').then((res) => {
            console.log(res.data);
            setCarList(res.data);
        })
    }, [])

    return (

        <Container maxWidth='xl'>
            <Typography variant='h6' color="white" marginBottom={2}>
                Your registered cars
            </Typography>
            <Grid container spacing={3}>
                {
                    carList.map((car) => (
                        <Grid item xs={12} md={6} xl={4}>
                            <Card elevation={5} style={cardStyle}>
                                <CardContent>
                                    <Typography>
                                        {car.model} {car.make} | {car.type}
                                    </Typography>
                                    <Typography>
                                        {car.gear} | {car.seats} seater
                                    </Typography>
                                    {
                                        car.imageFile && (
                                            <Box component="img" width="100%"
                                                src={`${import.meta.env.VITE_FILE_BASE_URL}${car.imageFile}`}
                                                alt="car image">
                                            </Box>
                                        )
                                    }
                                    <Box display={'flex'}>
                                        <Typography style={{ flexGrow: 1 }}>
                                            {car.price}/day
                                        </Typography>
                                        <Button variant='contained' color='btn' style={btnstyle}
                                            LinkComponent={Link} to={'/profile/registered_cars/edit/'+ car.id}>
                                            Edit Details
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>

    )
}

export default Registered_Cars