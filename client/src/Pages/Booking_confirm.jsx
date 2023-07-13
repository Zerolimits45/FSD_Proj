import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper, Card, CardContent } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import http from '../http'

function Booking_confirm() {
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const formik = useFormik({
    initialValues: {
      licencenumber: '',
    },
    validationSchema: yup.object().shape({
      licencenumber: yup.string().trim().min(9).max(9).required(),
    }),
    onSubmit: (data) => {
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
          <Card elevation={5}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Box>
                    <img src="../images/VW.png" alt="" width={'100%'} height={'300px'} style={{ objectFit: 'contain' }} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} display={'flex'} alignItems={'center'}>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' fontWeight={600}>
                      Volkswagen Golf
                    </Typography>
                    <Typography variant='h6' fontWeight={600}>
                      $100
                    </Typography>
                  </Box>
                </Grid>
              </Grid>


            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
        Driver details
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
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
        <Button type="submit" color='btn' variant='contained' fullWidth style={btnstyle}>Book Now</Button>
      </Box>
    </Container>
  )
}

export default Booking_confirm