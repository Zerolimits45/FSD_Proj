import { Grid, Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import React, { useState, useContext } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http.js';
import UserContext from '../contexts/UserContext.js';
function Login() {
    //styling variables
    const paperStyle = { padding: 20, width: 400, margin: '20px auto' }
    const avatarStyle = { backgroundColor: '#150039' }
    const fieldspacing = { margin: '10px 0' }
    const btnstyle = { margin: '8px 0' }
    //validation schema
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().trim().email('Email must be valid')
                .max(50, 'Email must be at most 50 characters')
                .required('Email is required'),
            password: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required'),
        }),
        onSubmit: (data) => {
            data.email = data.email.trim();
            data.password = data.password.trim();
            http.post('/user/login', data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setUser(res.data.user);
                    navigate("/")
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        const errorMessage = error.response.data.message;
                        formik.setErrors({
                            ...formik.errors,
                            email: errorMessage,
                            password: errorMessage,
                        });
                    }
                })
        },
    });

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <Typography variant='h5' fontWeight={600} marginTop={3} marginBottom={3}>
                        Sign In
                    </Typography>
                </Grid>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        label='Email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        placeholder='Enter Email'
                        fullWidth
                        style={fieldspacing}
                    />
                    <TextField
                        label='Password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        placeholder='Enter Password'
                        type='password'
                        fullWidth
                    />
                    <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle}>Sign In</Button>
                </Box>
                <Typography>
                    <Link href="#">
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography> Do you have an account?
                    <Link to={'/Signup'}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login