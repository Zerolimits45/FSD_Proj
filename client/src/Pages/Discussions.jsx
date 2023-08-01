import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Box, Paper, Grid, Typography, Button, Divider, Card, CardContent, TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';


function Discussions() {

    const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
    //validation schema
    const formik = useFormik({
        initialValues: {
            question: '',
        },
        validationSchema: yup.object().shape({
            question: yup.string().trim().required('Question must be valid')
        }),
        onSubmit: (data) => {
            data.question = data.question.trim();
        },
    });




    return (
        <Container maxWidth="xl">
            <Box>
                <Typography variant='h4' fontWeight={700} color={'white'} marginTop={10} marginBottom={4} align='center'>
                    Discussion Forum
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' fontWeight={700} color={'#150039'} marginBottom={5} align='center'>
                                Ask a question
                            </Typography>
                            <Grid container justifyContent='center'>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label='Enter your question'
                                        name='question'
                                        onChange={formik.handleChange}
                                        value={formik.values.question}
                                        error={formik.touched.question && Boolean(formik.errors.question)}
                                        helperText={formik.touched.question && formik.errors.question}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth>
                                    Ask our friendly community
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Typography variant='h5' fontWeight={700} color={'white'} marginTop={5} marginBottom={4} align='center'>
                        Recent Questions
                    </Typography>
                    <Box marginTop={5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} xl={4}>
                                <Card elevation={4}>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant='h5' fontWeight={700} color={'#150039'} marginBottom={5} align='center'>
                                                    Question
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant='h7' fontWeight={700} color={'#150039'} marginBottom={5} align='center'>
                                                    Comments
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <TextField
                                                    fullWidth
                                                    label='Comment on this question'
                                                    name='comment'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.question}
                                                    error={formik.touched.question && Boolean(formik.errors.question)}
                                                    helperText={formik.touched.question && formik.errors.question}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth>
                                                    Post
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Discussions