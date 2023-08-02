import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import http from '../../http'

function Dashboard() {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        http.get(`/user/profiles`).then((res) => {
            setUserList(res.data);
        });
    })
    const rows = userList.filter((user) => user.role == 'customer');
    const [carList, setCarList] = useState([]);
    useEffect(() => {
        http.get('/car/all').then((res) => {
            setCarList(res.data);
        })
    }, [])
    const [bookingList, setBookingList] = useState([]);
    useEffect(() => {
        http.get('/booking').then((res) => {
            setBookingList(res.data);
        })
    }, [])

    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' color="primary" marginBottom={2} align='center'>
                                Total Users
                            </Typography>
                            <Typography variant='h3' color="primary" marginBottom={2} align='center'>
                                {rows.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' color="primary" marginBottom={2} align='center'>
                                Total Bookings
                            </Typography>
                            <Typography variant='h3' color="primary" marginBottom={2} align='center'>
                                {bookingList.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' color="primary" marginBottom={2} align='center'>
                                Total Registered Cars
                            </Typography>
                            <Typography variant='h3' color="primary" marginBottom={2} align='center'>
                                {carList.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' color="primary" marginBottom={2} align='center'>
                                No. of Requests
                            </Typography>
                            <Typography variant='h3' color="primary" marginBottom={2} align='center'>
                                100
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard