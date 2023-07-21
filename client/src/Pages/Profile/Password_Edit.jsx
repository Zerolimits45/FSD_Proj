import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent, Avatar } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import http from '../../http';


function Password_Edit() {
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' };
    const { id } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: yup.object().shape({
            password: yup.string().trim().min(8).max(50).required(),
            newPassword: yup.string().trim().min(8).max(50).required(),
            confirmPassword: yup.string().trim().min(8).max(50).oneOf([yup.ref('newPassword')], 'Passwords Do Not Match').required()
        }),
        onSubmit: (data) => {
            http.put(`/user/profile/changepassword/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate(`/profile/account/${id}`);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        const errorMessage = error.response.data.message;
                        formik.setErrors({
                            ...formik.errors,
                            password: errorMessage,
                        });
                    }
                });
        },
    });
    return (
        <Container maxWidth='xl'>
            <Typography variant='h4' color="white" marginBottom={2}>
                Change your password
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            style={textfieldstyle}
                            name="password"
                            placeholder='Old Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            style={textfieldstyle}
                            name="newPassword"
                            placeholder='New Password'
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            style={textfieldstyle}
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            type="submit"
                            variant='contained'
                            color='btn'
                            style={btnstyle}
                            onClick={() => formik.handleSubmit}
                        >
                            Save Password
                        </Button>
                    </Grid>
                </Grid>
                <Button
                    LinkComponent={Link} to={`/profile/account/${id}`}
                    style={{ backgroundColor: 'white', marginTop: '1rem', fontWeight: 'bold'}}
                >
                    Back
                </Button>
            </Box>
        </Container>

    )
}

export default Password_Edit