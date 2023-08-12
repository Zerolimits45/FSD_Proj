import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import http from '../../http'
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

function Dashboard() {
    const [registrationTrendsData, setRegistrationTrendsData] = useState({
        labels: [], 
        datasets: [
            {
                label: 'Number of Users',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    });

    const [userList, setUserList] = useState([]);
    useEffect(() => {
        http.get(`/user/profiles`).then((res) => {
            const rows = res.data.filter((user) => (user.role == 'customer' || user.role == 'staff'));
            setUserList(rows)

            // Update registration trends data
            const registrationDates = rows.map((user) => user.createdAt);
            const registrationsPerDate = registrationDates.reduce((acc, date) => {
                const formattedDate = formatDate(date);
                acc[formattedDate] = (acc[formattedDate] || 0) + 1;
                return acc;
            }, {});

            setRegistrationTrendsData((prevData) => ({
                ...prevData,
                labels: Object.keys(registrationsPerDate),
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: Object.values(registrationsPerDate),
                    },
                ],
            }));
        });
    }, []);

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
    const [requestList, setRequestList] = useState([]);
    useEffect(() => {
        http.get('/request').then((res) => {
            setRequestList(res.data);
        })
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short' };
        return date.toLocaleDateString(undefined, options);
    }

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
                                {userList.length}
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
                                {requestList.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} mt={2}>
                <Card>
                    <CardContent>
                        <Typography variant='h6' color="primary" marginBottom={2} align='center'>
                            Registration Trends
                        </Typography>
                        <Line
                            data={registrationTrendsData}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

        </Container>
    )
}

export default Dashboard