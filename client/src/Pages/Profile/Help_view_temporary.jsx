import React from 'react'
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'

function Help_view_temporary() {
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2} marginTop={10}>
                <Grid item xs={12} sm={12}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Name:
                            </Typography>
                            <Typography>
                                Email:
                            </Typography>
                            <Typography>
                                Reason
                            </Typography>
                            <Button variant='contained' color='btn' style={btnstyle} LinkComponent={Link} to='/profile/help/view/edit'>
                                Edit Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Help_view_temporary