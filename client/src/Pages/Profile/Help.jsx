import { Grid, Typography, TextField, Button, Box, Container, Card, CardContent } from '@mui/material'
import React, { useState, useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import http from '../../http.js';
import { useSnackbar } from 'notistack';
import UserContext from '../../contexts/UserContext.js';

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

            http.post(`/profile/help/${user.id}`, data)
                .then((res) => {
                    enqueueSnackbar('Help request sent successfully', { variant: 'success' });
                    formik.resetForm();
                })


        },
    });
    return (
        <Container maxWidth='xl'>
            <Typography variant='h6' color="white" marginBottom={2}>
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