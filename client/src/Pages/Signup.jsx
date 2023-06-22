import { Avatar, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import React, {useState} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
function Signup() {
    const paperStyle = { padding: 20, width: 400, margin: '20px auto' }
    const fieldspacing = { margin: '10px 0' }
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            phone: Yup.number().typeError('Enter a valid phone number').required('Required'),
            password: Yup.string().min(8, 'Minimum 8 characters').required('Required'),
            confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
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
                    <Avatar style={{ backgroundColor: '#150039' }}><AddCircleIcon /></Avatar>
                    <Typography variant='h5' fontWeight={600} marginTop={3}>
                        Sign Up
                    </Typography>
                    <Typography variant='caption' gutterBottom>Please fill up the form to create an account</Typography>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        name="name"
                        label='Name'
                        fullWidth
                        style={fieldspacing}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        placeholder='Enter your name'
                    />
                    <TextField
                        name="email"
                        label='Email'
                        fullWidth
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        style={fieldspacing}
                        placeholder='Enter your email'
                    />
                    <TextField
                        name="phone"
                        label='Phone'
                        fullWidth
                        type='number'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        style={fieldspacing}
                        placeholder='Enter your phone number'
                    />
                    <TextField
                        name="password"
                        label='Password'
                        fullWidth
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        style={fieldspacing}
                        placeholder='Enter your password'
                    />
                    <TextField
                        name="confirmpassword"
                        label='Confirm Password'
                        fullWidth type='password'
                        onChange={formik.handleChange}
                        value={formik.values.confirmpassword}
                        error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                        helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                        style={fieldspacing}
                        placeholder='Confirm your password'
                    />
                    <Button type="submit" color='primary' variant='contained' disabled={isSubmitting} fullWidth style={fieldspacing}>{isSubmitting ? "Loading" : "Sign Up"}</Button>
                </form>
                <Typography> Already have an account?
                    <Link to={'/Login'}>
                        Log in
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup