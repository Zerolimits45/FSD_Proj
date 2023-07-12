import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import http from '../http'

function Booking_confirm() {
  const paperStyle = { width: '100%', marginTop: 1 }
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      licencenumber: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().trim().email().required(),
      name: yup.string().trim().min(5).required(),
      licencenumber: yup.string().trim().min(9).max(9).required(),
    }),
    onSubmit: (data) => {
      data.name = data.name.trim();
      data.email = data.email.trim();
      data.licencenumber = data.licencenumber.trim();
      data.startdate = startDate;
      data.enddate = endDate;

      http.post('/booking', data)
        .then((res) => {
          console.log(res.data)
          navigate("/")
        })
    },
  });


  return (
    <Container maxWidth='xl'>
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
          name='licencenumber'
          onChange={formik.handleChange}
          value={formik.values.licencenumber}
          error={formik.touched.licencenumber && Boolean(formik.errors.licencenumber)}
          helperText={formik.touched.licencenumber && formik.errors.licencenumber}
          placeholder='Enter License Number'
          fullWidth
        />
        <Button type="submit" color='btn' variant='contained' fullWidth style={btnstyle} >Book Now</Button>
      </Box>
    </Container>
  )
}

export default Booking_confirm