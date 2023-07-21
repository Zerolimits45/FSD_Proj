import React, { useState, useEffect, useContext } from 'react';
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent, Avatar } from '@mui/material';
import AndroidIcon from '@mui/icons-material/Android';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import http from '../../http';

function Account() {
    const avatarStyle = { backgroundColor: '#150039', marginTop: '1rem', width: '6rem', height: '6rem' };
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' };
    const accountTitle = { color: "#150039", fontWeight: "bold" }
    const accountText = { color: "#150039" , fontWeight: "semibold"}
    const { id } = useParams();

    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        http.get(`/user/profile/${id}`).then((res) => {
            setUser(res.data)
        });
    }, []);

    return (
        <Container maxWidth="xl">
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={2}>
                            <Avatar style={avatarStyle}>
                                <AndroidIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Typography variant="h4" style={accountTitle} marginTop={5}>
                                {user.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} marginTop={1}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" style={accountTitle} marginTop={2} marginBottom={2}>
                                Email:
                                <Typography variant="h6" style={accountText}>
                                    {user.email}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" style={accountTitle} marginTop={2} marginBottom={2}>
                                Phone number:
                                <Typography variant="h6" style={accountText}>
                                    {user.phone}
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="btn"
                        style={btnstyle}
                        LinkComponent={Link}
                        to={`/profile/account/edit/${user.id}`}
                    >
                        Edit Details
                    </Button>
                </CardContent>
            </Card>

            <Typography variant="h4" color="white" marginTop={10} marginBottom={2}>
                Change your password
            </Typography>
            <Button
                variant="contained"
                color="btn"
                style={btnstyle}
                LinkComponent={Link}
                to={`/profile/account/changepassword/${user.id}`}
            >
                Change Password
            </Button>
        </Container>
    );
}

export default Account;
