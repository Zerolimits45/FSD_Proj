import React, { useState, useEffect, useContext } from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent, Avatar } from '@mui/material'
import { useFormik } from 'formik'
import { Link, useParams, useNavigate } from 'react-router-dom';
import http from '../../http';
import UserContext from '../../contexts/UserContext.js';
import * as Yup from 'yup'

function Account_Edit() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const [u, setU] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        http.get(`/user/profile/${user.id}`).then((res) => {
            setU(res.data);
        });
    }, []);

    const regEx = /^[89]{1}\d{7}$/
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const formik = useFormik({
        initialValues: u,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().trim().min(5, 'Minimum 5 characters').required('Required'),
            email: Yup.string().trim().email('Invalid email format').required('Required'),
            phone: Yup.string().trim().min(8).max(8).matches(regEx, "Phone is Invalid").required('Required'),
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim();
            data.phone = data.phone.trim();
            http.put(`/user/profile/edit/${user.id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate(`/profile/account`);
                });
        },
    });
    return (
        <Container maxWidth='xl'>
            <Typography variant='h4' color="white" marginBottom={2}>
                Edit your details
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            style={textfieldstyle}
                            name="name"
                            placeholder='Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            style={textfieldstyle}
                            name="email"
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            style={textfieldstyle}
                            name="phone"
                            placeholder='Phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            fullwidth
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant='contained' style={{ backgroundColor: '#FF4E00', color: 'white', marginTop: '1rem' }}>Save Details</Button>
            </Box>
        </Container>

    )
}

export default Account_Edit