import { Grid, Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material'
import React, { useState, useContext } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../../http.js';
import UserContext from '../../contexts/UserContext.js';
function Help() {
    //styling variables
    const paperStyle = { padding: 20, width: 400, margin: '20px auto' }
    const avatarStyle = { backgroundColor: '#150039' }
    const fieldspacing = { margin: '10px 0' }
    const btnstyle = { margin: '8px 0' }
    //validation schema
    const navigate = useNavigate();
    const regEx = /^[0-9a-zA-Z]+$/;

    // const { setHelp } = useContext( UserContext );
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            reason: '',
            model: '',
            make: '',
            license_no: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().trim().email('Email must be valid')
                .max(50, 'Email must be at most 50 characters')
                .required('Email is required'),
            license_no: yup.string().trim().min(9).max(9, "License Number must not exceed 9 characters.").matches(regEx, "License Number is Invalid").required(),
            name: yup.string().trim().required(),
            model: yup.string().trim().required(),
            make: yup.string().trim().required(),
            reason: yup.string().trim().required(),
        }),
        onSubmit: (data) => {
            data.email = data.email.trim();
            data.license_no = data.license_no.trim();
            data.name = data.name.trim();
            data.model = data.model.trim();
            data.make = data.make.trim();
            data.reason = data.reason.trim();

            http.post('/user/help', data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setHelp(res.data.user);
                    navigate("/")
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        const errorMessage = error.response.data.message;
                        formik.setErrors({
                            ...formik.errors,
                            email: errorMessage,
                            license_no: errorMessage,
                        });
                    }
                })
        },
    });

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='h5' fontWeight={600} marginTop={3} marginBottom={3}>
                        Help
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
                        label='License Number'
                        name='license_no'
                        onChange={formik.handleChange}
                        value={formik.values.license_no}
                        error={formik.touched.license_no && Boolean(formik.errors.license_no)}
                        helperText={formik.touched.license_no && formik.errors.license_no}
                        placeholder='Enter License Number'
                        type='string'
                        fullWidth
                    />
                    <TextField
                        label='Name'
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        placeholder='Enter Name'
                        fullWidth
                        style={fieldspacing}
                    />
                    <TextField
                        label='Model'
                        name='model'
                        onChange={formik.handleChange}
                        value={formik.values.model}
                        error={formik.touched.model && Boolean(formik.errors.model)}
                        helperText={formik.touched.model && formik.errors.model}
                        placeholder='Enter Model'
                        fullWidth
                        style={fieldspacing}
                    />
                    <TextField
                        label='Make'
                        name='make'
                        onChange={formik.handleChange}
                        value={formik.values.make}
                        error={formik.touched.make && Boolean(formik.errors.make)}
                        helperText={formik.touched.make && formik.errors.make}
                        placeholder='Enter Make'
                        fullWidth
                        style={fieldspacing}
                    />
                    <TextField
                        label='Reason'
                        name='reason'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        placeholder='Enter Reason'
                        fullWidth
                    />
                    <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle}>Submit</Button>
                </Box>


            </Paper>
        </Grid>
    )
}

export default Help