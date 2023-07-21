import { Grid, Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import React, { useState, useContext } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http.js';
import UserContext from '../contexts/UserContext.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup_OTP() {
    const paperStyle = {
        padding: 20,
        width: 400,
        margin: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    };
    const avatarStyle = { backgroundColor: '#150039' }
    const fieldspacing = { margin: '10px 0' }
    const btnstyle = { margin: '8px 0' }

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: yup.object().shape({
            otp: yup.string().trim().length(6).required(),
        }),
        onSubmit: (data) => {
            data.otp = data.otp.trim();
            http.post('/user/register_otp', data)
                .then((res) => {
                    toast.success('Signed Up successfully');
                    navigate('/');
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        const errorMessage = error.response.data.message;
                        toast.error(`${errorMessage}`);
                    }
                })
        },
    });

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '70vh' }}
        >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <Typography variant='h5' fontWeight={600} marginTop={3} marginBottom={3}>
                        Enter OTP To Sign Up
                    </Typography>
                </Grid>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        label='OTP'
                        name='otp'
                        onChange={formik.handleChange}
                        value={formik.values.otp}
                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                        helperText={formik.touched.otp && formik.errors.otp}
                        placeholder='Enter OTP'
                        fullWidth
                        style={fieldspacing}
                    />
                    <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle}>Enter OTP</Button>
                </Box>
            </Paper>
        </Grid>
    )
}


export default Signup_OTP