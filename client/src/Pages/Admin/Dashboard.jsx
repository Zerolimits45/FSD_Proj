import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'

function Dashboard() {
  return (
    <Container maxWidth='xl'>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant='h6' color="white" marginBottom={2}>
                            Total Users
                        </Typography>
                        <Typography variant='h3' color="white" marginBottom={2}>
                            100
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant='h6' color="white" marginBottom={2}>
                            Total Bookings
                        </Typography>
                        <Typography variant='h3' color="white" marginBottom={2}>
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