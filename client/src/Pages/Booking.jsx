import { Typography, Grid, Container, TextField, Box, Button, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
function Booking() {
    //validation schema
    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: ''
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required(''),
            endDate: Yup.date().required('')
        }),
        onSubmit: values => {
            console.log(values)
        }
    })
    const paperStyle = { padding: 20, width: 400, marginTop: 10 }
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px' }
    return (
        <Container maxWidth='xl'>
            <Box>
                <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                    Set your date and choose a car
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                varient='filled'
                                style={textfieldstyle}
                                name='startDate'
                                type='date'
                                onChange={formik.handleChange}
                                value={formik.values.startDate}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                varient='filled'
                                style={textfieldstyle}
                                name='endDate'
                                type='date'
                                helperText={formik.touched.endDate && formik.errors.endDate}
                                onChange={formik.handleChange}
                                value={formik.values.endDate}
                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}

                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </form>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' color="white" marginTop={10} marginBottom={2} >
                            Filter by vechicle type
                        </Typography>
                        <Box>
                            <Button variant='text'>
                                <Box textAlign={"center"}>
                                    <img src="../images/Sedan.png" alt="" />
                                    <Typography variant='h6' fontSize={14} color="white" marginBottom={2} >
                                        Sedan
                                    </Typography>
                                </Box>
                            </Button>
                            <Button variant='text'>
                                <Box textAlign={"center"}>
                                    <img src="../images/SUV.png" alt="" />
                                    <Typography variant='h6' fontSize={14} color="white" marginBottom={2} >
                                        SUVs
                                    </Typography>
                                </Box>
                            </Button>
                            <Button variant='text'>
                                <Box textAlign={"center"}>
                                    <img src="../images/Minivan.png" alt="" />
                                    <Typography variant='h6' fontSize={14} color="white" marginBottom={2} >
                                        Minivans
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                            Filter by vehicle class
                        </Typography>
                        <Box>
                            <Button variant='text'>
                                <Box textAlign={"center"} marginRight={2}>
                                    <img src="../images/Standard.png" alt="" />
                                    <Typography variant='h6' fontSize={14} color="white" marginBottom={2} >
                                        Standard
                                    </Typography>
                                </Box>
                            </Button>
                            <Button variant='text'>
                                <Box textAlign={"center"} marginRight={2}>
                                    <img src="../images/Electric.png" alt="" />
                                    <Typography variant='h6' fontSize={14} color="white" marginBottom={2} marginTop={1} >
                                        Electric
                                    </Typography>
                                </Box>
                            </Button>
                            <Button variant='text'>
                                <Box textAlign={"center"} marginRight={2}>
                                    <img src="../images/Luxury.png" alt="" />
                                    <Typography variant='h6' fontSize={14} color="white" marginBottom={2} >
                                        Luxury
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                    Cars that are near you
                </Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={5} style={paperStyle}>
                            <Box>
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
                                    <Typography style={{flexGrow: 1}}>
                                        $Price/day
                                    </Typography>
                                    <Button variant='contained' color='btn' style={{color:'white'}}>Rent</Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={5} style={paperStyle}>
                            <Box>
                            <Typography>
                                    Standard
                                </Typography>
                                <Typography>
                                    Toyota | Sedan
                                </Typography>
                                <Typography>
                                    Automatic | 5 seater
                                </Typography>
                                <img src="../images/Toyota.png" alt="" width={'100%'} />
                                <Box display={'flex'}>
                                    <Typography style={{flexGrow: 1}}>
                                        $Price/day
                                    </Typography>
                                    <Button variant='contained' color='btn' style={{color:'white'}}>Rent</Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    )
}

export default Booking