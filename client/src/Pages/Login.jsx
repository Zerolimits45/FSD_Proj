import { Grid, Paper, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button} from '@mui/material'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
function Login() {
    //styling variables
    const paperStyle = { padding: 20, width: 400, margin: '20px auto' }
    const avatarStyle = { backgroundColor: '#150039' }
    const fieldspacing = { margin: '10px 0' }
    const btnstyle = { margin: '8px 0' }
    //validation schema
    const initialValues = {
        email: '',
        password: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter valid email').required('Required'),
        password: Yup.string().min(8, 'Password minimum length should be 8').required('Required')
    })
    const onSubmit = (values, props) => {
        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <Typography variant='h5' fontWeight={600} marginTop={3} marginBottom={3}>
                        Sign In
                    </Typography>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as= {TextField} label='Email' name='email' helperText={<ErrorMessage name='email'/>} placeholder='Enter Email' fullWidth style={fieldspacing} />
                            <Field as= {TextField} label='Password'name='password' helperText={<ErrorMessage name='password'/>} placeholder='Enter Password' type='password' fullWidth />
                            <Field as={FormControlLabel}
                            name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button type="submit" color='primary' variant='contained' fullWidth style={btnstyle} disabled={props.isSubmitting}>{props.isSubmitting?"Loading":"Sign In"}</Button>
                        </Form>
                    )}
                </Formik>
                
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