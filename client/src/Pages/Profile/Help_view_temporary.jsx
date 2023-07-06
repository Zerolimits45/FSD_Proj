import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'
import http from '../../http.js'
import UserContext from '../../contexts/UserContext.js';

function Help_view_temporary() {
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }

    const [helpList, setHelpList] = useState([])

    useEffect(() => {
        http.get('/profile/help/view').then((res) => {
            setHelpList(res.data)
        });
    }, []);
    return (
        helpList.map((help, i) => {
            return (
                <Container maxWidth='xl'>
                    <Grid container spacing={2} marginTop={5}>
                        <Grid item xs={12} sm={12}>
                            <Card>
                                <CardContent>
                                    <Typography>
                                        Name: {help.name}
                                    </Typography>
                                    <Typography>
                                        Email: {help.email}
                                    </Typography>
                                    <Typography>
                                        Reason {help.reason}
                                    </Typography>
                                    <Button variant='contained' color='btn' style={btnstyle} LinkComponent={Link} to={`/profile/help/view/edit/${help.id}`}>
                                        Edit Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            )
        }
        ))}
export default Help_view_temporary