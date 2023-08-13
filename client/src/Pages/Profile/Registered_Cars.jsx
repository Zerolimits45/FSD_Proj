import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import http from '../../http'

function Registered_Cars() {
    const cardStyle = { width: '100%', marginTop: 10 }
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#6CA0DC', marginRight: 10 }
    const removebtn = { margin: '8px 0', fontWeight: 'bold', backgroundColor: '#C70000' }
    const carTitle = { color: "#150039", fontWeight: "bold" }
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState(false);
    const handleOpen = (car) => {
        setOpen(true);
        setCar(car)
    };
    const handleClose = () => {
        setOpen(false);
    };

    //fetching car list
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        http.get('/car/user').then((res) => {
            console.log(res.data);
            setCarList(res.data);
        })
    }, [])

    const [requestList, setRequestList] = useState([]);
    useEffect(() => {
        http.get('/request').then((res) => {
            setRequestList(res.data)
        })
    })

    const existingRequest = requestList.find(request => request.carid === car.id);

    const removeCar = (car) => {
        if (existingRequest) {
            console.log("There's an existing request for this booking.");
        } else {
            const requestData = {
                request: `Remove Car with Id ${car.id}`,
                carid: car.id,
            };
            http.post('/request/removecar', requestData).then((res) => {
                console.log(res.data)
                handleClose()
            })
        }
    };

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
                                    </Box>
                                    <Box display={'flex'}>
                                        <Button variant='contained' style={btnstyle}
                                            LinkComponent={Link} to={'/profile/registered_cars/edit/' + car.id}>
                                            Edit Details
                                        </Button>
                                        {requestList.find(request => request.carid === car.id) ? null : (
                                            <Button
                                                variant='contained'
                                                style={removebtn}
                                                onClick={() => handleOpen(car)}
                                            >
                                                Remove Car
                                            </Button>
                                        )}
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        Remove Car
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to remove your car with us?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="inherit"
                            onClick={handleClose}>
                            Back
                        </Button>
                        <Button variant="contained" color="error" onClick={() => removeCar(car)}>
                            Remove Car
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container >

    )
}

export default Registered_Cars