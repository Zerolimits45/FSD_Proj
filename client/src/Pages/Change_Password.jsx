import { Grid, Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import React, { useState, useContext } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http.js';
import UserContext from '../contexts/UserContext.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Change_Password() {
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      password: yup.string().trim().min(8).max(50).required(),
      confirmPassword: yup.string().trim().min(8).max(50).oneOf([yup.ref('password')], 'Passwords Do Not Match').required()
    }),
    onSubmit: (data) => {
      http.put(`/user/forgotpassword?token=${token}`, data)
        .then((res) => {
          toast.success('Password Changed Successfully');
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
            Change Password
          </Typography>
        </Grid>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            style={fieldspacing}
            name="password"
            placeholder= 'New Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <TextField
            style={fieldspacing}
            name="confirmPassword"
            placeholder='Confirm Password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            fullWidth
          />
          <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle}>Change Password</Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Change_Password