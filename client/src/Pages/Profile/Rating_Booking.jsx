import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, Box, Button, Card, CardContent, Rating, TextField } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import http from '../../http'

function Rating_Booking() {
    const [value, setValue] = useState(2);
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0', width: '100%' }
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }

    const navigate = useNavigate();
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            rate: '',
            feedback: '',
        },
        validationSchema: yup.object().shape({
            feedback: yup.string().trim().required(),
            rate: yup.number().min(1).max(5).integer('Value must be an integer'),

        }),
        onSubmit: (data) => {
            data.feedback = data.feedback.trim();
            data.rate = value;
            http.post(`/profile/rate/${id}`, data)
                .then((res) => {
                    navigate("/profile/bookings")
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        const errorMessage = error.response.data.message;
                        formik.setErrors({
                            ...formik.errors,
                            rate: errorMessage,
                            feedback: errorMessage,
                        });
                    }
                })
        },
    });

    return (
        <Container maxWidth='xl'>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Typography variant='h5' color="white" marginBottom={2} align='center'>
                    Thank you for riding with us!
                </Typography>
                {/* Rectangle Booking */}
                <Typography variant='h5' color="white" marginTop={10} marginBottom={2} align='center'>
                    We would appreciate if you could leave us a review!
                </Typography>
                <Box display="flex" justifyContent="center" marginTop={5} >
                    {/* Centered star rating */}
                    <Rating
                        name="rating"
                        size="large"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{
                            fontSize: "4rem",
                        }}
                    />
                </Box>
                <Typography variant='h5' color="white" marginTop={5} marginBottom={2} align='center'>
                    and do you have any feedback for us?
                </Typography>
                <Box display="flex" justifyContent="center">
                    {/* Centered text field */}
                    <TextField
                        style={textfieldstyle}
                        name='feedback'
                        id="outlined-multiline-static"
                        align='center'
                        multiline
                        rows={10}
                        placeholder="Leave us a Feedback!"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.feedback}
                        error={formik.touched.feedback && Boolean(formik.errors.feedback)}
                        helperText={formik.touched.feedback && formik.errors.feedback}
                    />
                </Box>

                <Button type='submit' variant="contained" color='btn' style={btnstyle} >
                    Send Feedback
                </Button>
            </Box>
        </Container>
    )
}

export default Rating_Booking