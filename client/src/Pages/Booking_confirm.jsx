import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper, Card, CardContent, Divider } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import http from '../http'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { differenceInDays } from 'date-fns';

function Booking_confirm() {
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
  const dividerstyle = { backgroundColor: '#150039', fontWeight: 'bold', margin: '10px 0' }
  const textstyle = { color: '#150039' }

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const carId = searchParams.get('carId')

  const [car, setCar] = useState([]);
  const daysDifference = differenceInDays(new Date(endDate), new Date(startDate));

  useEffect(() => {
    http.get(`/car/${carId}`).then((res) => {
      setCar(res.data);
      console.log(res.data);
    })
  }, [])

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
      data.carid = car.id
      data.price = car.price * daysDifference

      http.post(`/stripe/create-checkout-session?carId=${carId}`, data)
        .then((res) => {
          console.log(res.data)
          window.location.href = res.data.url
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
                    {
                      car.imageFile && (
                        <Box component="img" alt="car image" width="100%" height="500px" style={{ objectFit: 'contain' }}
                          src={`${import.meta.env.VITE_FILE_BASE_URL}${car.imageFile}`}>
                        </Box>
                      )
                    }
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} display={'flex'} alignItems={'center'}>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5' fontWeight={600} style={textstyle}>
                      {car.model} {car.make} | {car.type}
                    </Typography>
                    <Divider style={dividerstyle} />
                    <Typography variant='h6' fontWeight={400} style={textstyle}>
                      Start Date: {startDate}
                    </Typography>
                    <Typography variant='h6' fontWeight={400} style={textstyle}>
                      End Date: {endDate}
                    </Typography>
                    <Typography variant='h6' fontWeight={400} marginTop={2} style={textstyle}>
                      <AccessTimeFilledIcon fontSize='small' /> {daysDifference} days
                    </Typography>
                    <Divider style={dividerstyle} />
                    <Typography variant='h6' fontWeight={400} style={textstyle}>
                      Total: $ {car.price * daysDifference}
                    </Typography>
                    <Divider style={dividerstyle} />
                    <Typography variant='h6' fontWeight={300} style={textstyle}>
                      Please head down to the our building to collect your car.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
        Please fill up your details
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