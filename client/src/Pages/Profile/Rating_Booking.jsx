import React from 'react'
import { Typography, Grid, Container, Box, Button, Card, CardContent, Rating, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Rating_Booking() {
    const [value, setValue] = React.useState(2);
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0', width: '100%' }

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            rate: '',
            feedback: '',
        },
        validationSchema: yup.object().shape({
            name: yup.string().trim().required(),
            rate: yup.number().min(1).max(5).integer('Value must be an integer'),

        }),
        onSubmit: (data) => {
            data.name = data.name.trim();


            http.post('/profile/rate', data)
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
                            rate: errorMessage,
                            feedback: errorMessage,
                        });
                    }
                })
        },
    });

    return (
        <Container maxWidth='xl'>
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
                    id="outlined-multiline-static"
                    align='center'
                    multiline
                    rows={10}
                    placeholder="Leave us a Feedback!"
                    variant="outlined"
                />
            </Box>
        </Container>
    )
}

export default Rating_Booking