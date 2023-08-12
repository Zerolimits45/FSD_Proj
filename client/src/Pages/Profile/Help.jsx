import { Grid, Typography, TextField, Button, Box, Container, Card, CardContent, Divider } from '@mui/material'
import React, { useState, useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import http from '../../http.js';
import { useSnackbar } from 'notistack';
import UserContext from '../../contexts/UserContext.js';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

function Help() {
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
    const { enqueueSnackbar } = useSnackbar()
    const { user, setUser } = useContext(UserContext)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            reason: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email address').required('Email is required'),
            reason: yup.string().required('Reason is required'),
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim();
            data.reason = data.reason.trim();

            http.post(`/profile/help`, data)
                .then((res) => {
                    enqueueSnackbar('Help request sent successfully', { variant: 'success' });
                    formik.resetForm();
                })


        },
    });
    return (
        <Container maxWidth='xl'>

            <Typography variant='h6' fontWeight={600} color={'white'} align='center'>
                FAQ
            </Typography>
            <Grid container spacing={4} style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                            <Typography variant='body' fontWeight={600}>
                                How do i request a ride?
                            </Typography>
                            <br />
                            <Typography variant='body' fontWeight={400}>
                                Sign up or log in to your account, enter your pickup and drop-off locations, and select the type of ride you need. Our system will match you with the most suitable driver, and you'll receive real-time updates on their estimated arrival time.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                            <Typography variant='body' fontWeight={600}>
                                How can I pay for my rides?
                            </Typography>
                            <br />
                            <Typography variant='body' fontWeight={400}>
                                We offer a variety of convenient payment options, including credit or debit cards, mobile wallets, and in-app payment systems like Apple Pay and Google Pay. Your selected payment method will be securely saved in your account for future use.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                            <Typography variant='body' fontWeight={600}>
                                How can I contact customer support?
                            </Typography>
                            <br />
                            <Typography variant='body' fontWeight={400}>
                                If you have any questions or need assistance, our dedicated customer support team is available 24/7. You can reach us through the websites' help center, where you'll find frequently asked questions and troubleshooting guides.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                            <Typography variant='body' fontWeight={600}>
                                What safety measures are in place?
                            </Typography>
                            <br />
                            <Typography variant='body' fontWeight={400}>
                                Your safety is our top priority. We carefully screen all drivers, ensuring they meet our rigorous standards and have a clean driving record. Additionally, we implement various safety features, such as GPS tracking, driver ratings and reviews.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <Typography variant='h6' color="white" fontWeight={600} marginBottom={2} marginTop={10} align='center'>
                Please send us a message if you need any help
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Name"
                                    name='name'
                                    style={textfieldstyle}
                                    fullWidth
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name='email'
                                    style={textfieldstyle}

                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Reason"
                                    name='reason'
                                    style={textfieldstyle}

                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                                    helperText={formik.touched.reason && formik.errors.reason}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth>
                    Send your help request
                </Button>
            </Box>
        </Container>
    )
}

export default Help