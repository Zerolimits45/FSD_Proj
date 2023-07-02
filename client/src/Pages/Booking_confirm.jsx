import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Booking_confirm() {
  const paperStyle = { padding: 20, width: 400, marginTop: 10 }
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0'  }
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      license: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().trim().required('Name is required'),
      email: yup.string().trim().email('Email must be valid').required('Email is required'),
      license: yup.string().trim().required('License is required'),
    }),
    onSubmit: (data) => {
      data.name = data.name.trim();
      data.email = data.email.trim();
      data.license = data.license.trim();
      console.log(data);
    },
  });


  return (
    <Container maxWidth='xl'>
      <Box>
        <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
          Review and confirm booking
        </Typography>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Paper elevation={5} style={paperStyle}>
              <Box>
                <img src="../images/VW.png" alt="" width={'100%'} />
              </Box>
              <Box style={{ display: 'flex', marginTop: 10 }}>
                <Typography variant='h6' fontWeight={600}>
                  Volkswagen Golf
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                  $100
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
        Driver details
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          style={textfieldstyle}
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          placeholder='Enter your name'
          fullWidth

        />
        <TextField
          style={textfieldstyle}
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder='Enter Email'
          fullWidth
        />
        <TextField
          style={textfieldstyle}
          name='license'
          onChange={formik.handleChange}
          value={formik.values.license}
          error={formik.touched.license && Boolean(formik.errors.license)}
          helperText={formik.touched.license && formik.errors.license}
          placeholder='Enter License Number'
          fullWidth
        />
        <Button type="submit" color='btn' variant='contained' fullWidth style={btnstyle}>Book Now</Button>
      </Box>
    </Container>
  )
}

export default Booking_confirm