import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Box, Paper, Grid, Typography, Button, Divider, Card, CardContent, TextField } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { AccountCircle } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
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

    const formik2 = useFormik({
        initialValues: {
            description: '',
        },
        validationSchema: yup.object({
            description: yup.string().trim().min(3).max(500).required()
        }),
        onSubmit: (data) => {
            data.description = data.description.trim();
            http.post(`/discussion/comment/${selectedDiscussionId}`, data)
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

    function formatDateInWords(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const [open, setOpen] = useState(false);
    const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);

    const handleOpen = (discussionId) => {
        setSelectedDiscussionId(discussionId);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
                                    <>
                                        <Grid item xs={12} md={6} xl={4}>
                                            <Card elevation={4}>
                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                            <Typography variant='h5' fontWeight={700} color={'#150039'}>
                                                                {discussion.title}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid container>
                                                                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                    <AccountCircle />
                                                                    <Typography variant='h8' fontWeight={700} color={'#150039'} style={{ marginLeft: '5px' }}>
                                                                        {discussion.user.name}
                                                                    </Typography>
                                                                </Grid>

                                                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                    <Typography variant='h8' fontWeight={700} color={'#150039'} >
                                                                        {formatDateInWords(discussion.createdAt)}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography variant='h7' fontWeight={600} color={'#150039'} align='left' style={{ wordWrap: 'break-word' }}>
                                                                {discussion.description}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Typography variant='h7' fontWeight={700} color={'#150039'} marginBottom={5} align='left' onClick={() => handleOpen(discussion.id)}>
                                                                Comments ({discussion.commentsCount})
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        <Dialog open={open && discussion.id === selectedDiscussionId} onClose={handleClose}>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6} md={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                        <Typography variant='h5' fontWeight={700} color={'#150039'}>
                                                            {discussion.title}
                                                        </Typography>
                                                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', right: '10px', top: '10px', cursor: 'pointer' }}>
                                                            <CancelIcon onClick={handleClose} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6} md={6}>
                                                        <Grid container>
                                                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                <AccountCircle />
                                                                <Typography variant='h8' fontWeight={700} color={'#150039'} style={{ marginLeft: '5px' }}>
                                                                    {discussion.user.name}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Typography variant='h8' fontWeight={700} color={'#150039'} >
                                                                    {formatDateInWords(discussion.createdAt)}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Typography variant='h7' fontWeight={600} color={'#150039'} align='left' style={{ wordWrap: 'break-word' }}>
                                                            {discussion.description}
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
                                                            label='Comment'
                                                            name='description'
                                                            onChange={formik2.handleChange}
                                                            value={formik2.values.description}
                                                            error={formik2.touched.description && Boolean(formik2.errors.description)}
                                                            helperText={formik2.touched.description && formik2.errors.description}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth onClick={formik2.handleSubmit}>
                                                            Comment
                                                        </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Dialog >
                                    </>
                        ))
                            }
                    </Grid>
                </Box>
            </Box>
        </Box>
        </Container >
    )
}

export default Discussions