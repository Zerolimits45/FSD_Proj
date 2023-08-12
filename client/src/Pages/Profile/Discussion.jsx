import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Container, Box, Paper, Grid, Typography, Button, Divider, Card, CardContent, TextField } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { AccountCircle } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from 'yup';
import http from '../../http.js';
import UserContext from '../../contexts/UserContext.js';

function Discussion() {
    const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
    const navigate = useNavigate();
    const { user } = useContext(UserContext)

    const [discussionList, setDiscussionList] = useState([]);
    useEffect(() => {
        http.get('/discussion/user').then((res) => {
            setDiscussionList(res.data);
        })
    }, [])

    function formatDateInWords(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const [open, setOpen] = useState(false);
    const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);
    const [commentList, setCommentList] = useState([]);

    const handleOpen = (discussionId) => {
        setSelectedDiscussionId(discussionId);
        setOpen(true);
        http.get(`/discussion/comments/${discussionId}`).then((res) => {
            setCommentList(res.data);
        })
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [open2, setOpen2] = useState(false);

    const handleOpen2 = (discussionId) => {
        setSelectedDiscussionId(discussionId);
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const [open3, setOpen3] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    const handleOpen3 = (commentId) => {
        setSelectedCommentId(commentId);
        setOpen3(true);
    };
    const handleClose3 = () => {
        setOpen3(false);
    };

    return (
        <Container maxWidth='xl'>
            <Typography variant='h6' color="white" marginBottom={2}>
                Your Posts
            </Typography>
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
                                            <Grid item xs={6} md={6}>
                                                <Typography variant='h7' fontWeight={700} color={'#150039'} style={{ display: 'flex', justifyContent: 'flex-start', cursor: 'pointer' }} onClick={() => handleOpen(discussion.id)}>
                                                    Comments ({discussion.commentsCount})
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={6}>
                                                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleOpen2(discussion.id)} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Dialog open={open2} onClose={handleClose2}>
                                <DialogTitle>
                                    Delete Post
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete this Post?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" color="inherit"
                                        onClick={handleClose2}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="error"
                                        onClick={() => {
                                            http.delete(`/discussion/${selectedDiscussionId}`).then((res) => {
                                                console.log(res.data)
                                                navigate('/')
                                            });
                                        }}>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>

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
                                        {
                                            commentList.map((comment) => (
                                                <>
                                                    <Grid item xs={12} md={12}>
                                                        <Grid container style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '10px' }}>
                                                            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} marginBottom={2}>
                                                                <AccountCircle />
                                                                <Typography variant='h7' fontWeight={700} color={'#150039'} style={{ marginLeft: '5px' }}>
                                                                    {comment.user.name}
                                                                </Typography>
                                                            </Grid>
                                                            {
                                                                comment.user.id == user.id && (
                                                                    <Grid item xs={6} md={6}>
                                                                        <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                                            <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleOpen3(comment.id)} />
                                                                        </Grid>
                                                                    </Grid>
                                                                )
                                                            }
                                                            <Grid item xs={12}>
                                                                <Typography variant='body1' fontWeight={700} color={'#150039'}>
                                                                    {comment.description}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            ))
                                        }

                                        <Dialog open={open3} onClose={handleClose3}>
                                            <DialogTitle>
                                                Delete Comment
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Are you sure you want to delete this Comment?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button variant="contained" color="inherit"
                                                    onClick={handleClose3}>
                                                    Cancel
                                                </Button>
                                                <Button variant="contained" color="error"
                                                    onClick={() => {
                                                        http.delete(`/discussion/comment/${selectedCommentId}`).then((res) => {
                                                            console.log(res.data)
                                                            navigate('/')
                                                        });
                                                    }}>
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

                                    </Grid>
                                </CardContent>
                            </Dialog >
                        </>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default Discussion