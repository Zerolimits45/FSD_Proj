import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper, Card, CardContent } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Help() {
    return (
        <Container maxWidth='xl'>
            <Typography variant='h4' color="white" marginBottom={2}>
                Help
            </Typography>
            <Grid container>
                
                <Grid item xs={12} md={12}>
                    <Card elevation={5}>
                        <CardContent>
                          
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Help