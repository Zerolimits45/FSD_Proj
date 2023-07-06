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

function Forgot_Password() {
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
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().trim().email('Email must be valid')
        .max(50, 'Email must be at most 50 characters')
        .required('Email is required')
    }),
    onSubmit: (data) => {
      data.email = data.email.trim();
      http.post('/user/forgotpassword', data)
        .then((res) => {
          toast.success('Email sent successfully');
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
            Enter Email For The Link To Change Password
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
          <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle}>Send Email</Button>
        </Box>
        <Typography> Do you have an account?
          <Link to={'/Signup'}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Forgot_Password