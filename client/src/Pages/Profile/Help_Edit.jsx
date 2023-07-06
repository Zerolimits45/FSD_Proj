import React, { useState, useReact, useEffect } from 'react'
import { Container, Grid, Card, CardContent, Typography, Button, Box, TextField } from '@mui/material'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import http from '../../http.js'
function Help_Edit() {
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const navigate = useNavigate()

    const { id } = useParams();

    const [help, setHelp] = useState({
        email: "",
        name: "",
        reason: ""
    });
    useEffect(() => {
        http.get(`/profile/help/view/edit/${id}`).then((res) => {
            setHelp(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: help,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            reason: Yup.string().required('Reason is required'),
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim();
            data.reason = data.reason.trim();
            http.put(`/profile/help/view/edit/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate(`/profile/help/view/`);
                });
        },
    });
    return (
        <Container maxWidth='xl'>
            <Typography variant='h6' color="white" marginBottom={2}>
                Edit help details
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name='name'
                            style={textfieldstyle}
                            placeholder="Name"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name='email'
                            style={textfieldstyle}
                            placeholder="Email"
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
                            name='reason'
                            style={textfieldstyle}
                            placeholder="Reason"
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
                <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth>
                    Save Details
                </Button>
            </Box>
        </Container>
    )
}

export default Help_Edit