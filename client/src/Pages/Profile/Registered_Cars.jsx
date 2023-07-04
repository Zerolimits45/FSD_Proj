import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'

function Registered_Cars() {
  return (
    
    <Container maxWidth='xl'>
            <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                Your registered cars
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                    <Card elevation={5} style={paperStyle}>
                        <CardContent>
                            <Typography>
                                Standard
                            </Typography>
                            <Typography>
                                VW T Cross | SUV
                            </Typography>
                            <Typography>
                                Automatic | 5 seater
                            </Typography>
                            <img src="../images/VW.png" alt="" width={'100%'} />
                            <Box display={'flex'}>
                                <Typography style={{ flexGrow: 1 }}>
                                    $Price/day
                                </Typography>
                                <Button variant='contained' color='btn' style={{ color: 'white' }} LinkComponent={Link} to='/booking_confirm'>Rent</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    </Container>

  )
}

export default Registered_Cars