import React, { useState, useEffect, useContext } from 'react';
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent, Avatar } from '@mui/material';
import AndroidIcon from '@mui/icons-material/Android';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import http from '../../http';

function Account() {
    const avatarStyle = { backgroundColor: '#150039`', marginTop: '1rem', width: '5rem', height: '5rem' };
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' };

    const { id } = useParams();

    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        http.get(`/user/profile/${id}`).then((res) => {
            setUser(res.data)
        });
    }, []);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" color="white" marginBottom={2}>
                Your account details
            </Typography>
            <Card>
                <CardContent>
                    <Avatar style={avatarStyle}>
                        <AndroidIcon />
                    </Avatar>
                    <Typography variant="h6" color="primary" marginTop={2} marginBottom={2}>
                        Your name: {user.name}
                    </Typography>
                    <Typography variant="h6" color="primary" marginTop={2} marginBottom={2}>
                        Your email: {user.email}
                    </Typography>
                    <Typography variant="h6" color="primary" marginTop={2} marginBottom={2}>
                        Your phone number: {user.phone}
                    </Typography>
                    <Button
                        variant="contained"
                        color="btn"
                        style={btnstyle}
                        LinkComponent={Link}
                        to={`/profile/account/edit/${user.id}`}
                    >
                        Change Personal Details
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
