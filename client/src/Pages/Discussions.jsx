import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Box, Paper, Grid, Typography, Button, Divider, Card, CardContent, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http.js';

function Discussions() {

    const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
    const navigate = useNavigate();

    //validation schema
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: yup.object({
            title: yup.string().trim().min(3).max(100).required(),
            description: yup.string().trim().min(3).max(500).required()
        }),
        onSubmit: (data) => {
            data.title = data.title.trim();
            data.description = data.description.trim();
            http.post('/discussion', data)
                .then((res) => {
                    console.log(res.data)
                    navigate("/")
                })
        },
    });

    const [discussionList, setDiscussionList] = useState([]);
    useEffect(() => {
        http.get('/discussion').then((res) => {
            setDiscussionList(res.data);
        })
    }, [])

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
                                Share your thoughts
                            </Typography>
                            <Grid container justifyContent='center'>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label='Enter Title'
                                        name='title'
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                    />
                                    <TextField
                                        fullWidth
                                        label='Enter Description'
                                        name='description'
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth>
                                    Post
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Typography variant='h5' fontWeight={700} color={'white'} marginTop={5} marginBottom={4} align='center'>
                        Recent Threads
                    </Typography>
                    <Box marginTop={5}>
                        <Grid container spacing={3}>
                            {
                                discussionList.map((discussion) => (
                                    <Grid item xs={12} md={6} xl={4}>
                                        <Card elevation={4}>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={12}>
                                                        <Typography variant='h5' fontWeight={700} color={'#150039'} align='left'>
                                                            {discussion.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Typography variant='h5' color={'#150039'} align='left'>
                                                            {discussion.description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Typography variant='h7' fontWeight={700} color={'#150039'} marginBottom={5} align='left'>
                                                            Comments ({discussion.commentsCount})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Discussions