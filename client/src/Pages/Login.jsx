import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
function Login() {
    //styling variables
    const paperStyle = { padding: 20, width: 400, margin: '20px auto' }
    const avatarStyle = { backgroundColor: '#150039' }
    const fieldspacing = { margin: '10px 0' }
    const btnstyle = { margin: '8px 0' }
    const [isSubmitting, setIsSubmitting] = useState(false)
    //validation schema
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required')
        }),
        onSubmit: values => {
            setIsSubmitting(true)
            console.log(values)
        }
    })

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <Typography variant='h5' fontWeight={600} marginTop={3} marginBottom={3}>
                        Sign In
                    </Typography>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label='Email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        placeholder='Enter Email'
                        fullWidth
                        style={fieldspacing}
                    />
                    <TextField
                        label='Password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        placeholder='Enter Password'
                        type='password'
                        fullWidth
                    />
                    <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle} disabled={isSubmitting}>{isSubmitting ? "Loading" : "Sign In"}</Button>
                </form>
                <Typography>
                    <Link href="#">
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography> Do you have an account?
                    <Link to={'/Signup'}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login