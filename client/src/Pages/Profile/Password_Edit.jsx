import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent, Avatar } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

function Password_Edit() {
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const formik = useFormik({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_new_password: '',
        },
        validationSchema: Yup.object({
            old_password: Yup.string().trim().min(8, 'Minimum 8 characters').required('Required'),
            new_password: Yup.string().trim().min(8, 'Minimum 8 characters').required('Required'),
            confirm_new_password: Yup.string().trim().min(8, 'Minimum 8 characters').required('Required'),
        }),
        onSubmit: (data) => {
            data.old_password = data.old_password.trim();
            data.new_password = data.new_password.trim();
            data.confirm_new_password = data.confirm_new_password.trim();
            console.log(data);
        },
    });
  return (
    <Container maxWidth='xl'>
        <Typography variant='h4' color="white" marginTop={10} marginBottom={2}>
            Change your password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        style={textfieldstyle}
                        name="old_password"
                        placeholder='Old Password'
                        value={formik.values.old_password}
                        onChange={formik.handleChange}
                        error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                        helperText={formik.touched.old_password && formik.errors.old_password}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        style={textfieldstyle}
                        name="new_password"
                        placeholder='New Password'
                        value={formik.values.new_password}
                        onChange={formik.handleChange}
                        error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                        helperText={formik.touched.new_password && formik.errors.new_password}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        style={textfieldstyle}
                        name="confirm_password"
                        placeholder='Confirm Password'
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button
                        type="submit"
                        variant='contained'
                        style={{ backgroundColor: '#FF4E00', color: 'white', marginTop: '1rem' }}
                    >
                        Save Password
                    </Button>
                </Grid>
            </Grid>
            <Button LinkComponent={Link} to='/profile/account' style={{backgroundColor:'white', marginTop:'1rem'}}>Back</Button>
        </Box>
    </Container>

  )
}

export default Password_Edit