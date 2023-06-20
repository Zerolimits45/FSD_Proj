import { Avatar, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Formik, Field, Form,ErrorMessage } from 'formik'
import * as Yup from 'yup'
function Signup() {
    const paperStyle = { padding: 20, width: 400, margin: '20px auto' }
    const fieldspacing = { margin: '10px 0' }
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email('Enter valid email').required("Required"),
        phone: Yup.number().typeError("Enter valid phone number").required("Required"),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmpassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required")
    })
    const onSubmit = (values, props) => {
        console.log(values)
        console.log(props)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#150039' }}><AddCircleIcon /></Avatar>
                    <Typography variant='h5' fontWeight={600} marginTop={3}>
                        Sign Up
                    </Typography>
                    <Typography variant='caption' gutterBottom>Please fill up the form to create an account</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} name="name" label='Name' fullWidth style={fieldspacing} helperText={<ErrorMessage name='name'/>} placeholder='Enter your name' />
                            <Field as={TextField} name="email" label='Email' fullWidth type='email' helperText={<ErrorMessage name='email'/>} style={fieldspacing} placeholder='Enter your email' />
                            <Field as={TextField} name="phone" label='Phone' fullWidth type='number' helperText={<ErrorMessage name='phone'/>} style={fieldspacing} placeholder='Enter your phone number' />
                            <Field as={TextField} name="password" label='Password' fullWidth type='password' helperText={<ErrorMessage name='password'/>} style={fieldspacing} placeholder='Enter your password' />
                            <Field as={TextField}name="confirmpassword" label='Confirm Password' fullWidth type='password' helperText={<ErrorMessage name='confirmpassword'/>} style={fieldspacing} placeholder='Confirm your password' />
                            <Button type="submit" color='primary' variant='contained' disabled={props.isSubmitting} fullWidth style={fieldspacing}>{props.isSubmitting?"Loading":"Sign Up"}</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup