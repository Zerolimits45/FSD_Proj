import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import http from '../../http'
import { useSnackbar } from 'notistack';
import { differenceInDays } from 'date-fns';

function Bookings_Edit() {
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const textstyle = { color: '#150039', fontWeight: 'bold' }

  const [booking, setBooking] = useState({
    startdate: "",
    enddate: "",
    licencenumber: "",
    price: ""
  });
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: booking,
    validationSchema: yup.object().shape({
      startdate: yup.date().required('Start Date Required'),
      enddate: yup.date()
        .required('End Date Required')
        .test('is-after-or-equal-start-date', 'End date must be after start date', function (value) {
          const startDate = this.resolve(yup.ref('startdate'));
          return startDate && differenceInDays(value, startDate) >= 0;
        }),
      licencenumber: yup.string().trim().required('Licence number is required'),
      price: yup.number().required('Price is required'),
    }),
    onSubmit: (data) => {
      data.licencenumber = data.licencenumber.trim();

      http.put('/booking/' + id, data)
        .then((res) => {
          enqueueSnackbar('Booking details saved', { variant: 'success' });
          console.log(res.data);
        }
        )
    },
    enableReinitialize: true
  });

  useEffect(() => {
    http.get(`/booking/${id}`).then((res) => {
      const startDate = new Date(res.data.startdate).toISOString().split('T')[0];
      const endDate = new Date(res.data.enddate).toISOString().split('T')[0];

      setBooking({
        ...res.data,
        startdate: startDate,
        enddate: endDate,
      });

      console.log(res.data);
    });
  }, []);


  return (
    <Container maxWidth='xl'>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant='h6' color="white" marginBottom={2}>
          Edit time period of the car booking:
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant='h7' style={textstyle}>
                  Start Date:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='h7' style={textstyle}>
                  End Date:
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  varient='filled'
                  style={textfieldstyle}
                  name='startdate'
                  type='date'
                  onChange={formik.handleChange}
                  value={formik.values.startdate}
                  error={formik.touched.startdate && Boolean(formik.errors.startdate)}
                  helperText={formik.touched.startdate && formik.errors.startdate}
                  placeholder='Booking start date'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  varient='filled'
                  style={textfieldstyle}
                  name='enddate'
                  type='date'
                  onChange={formik.handleChange}
                  value={formik.values.enddate}
                  error={formik.touched.enddate && Boolean(formik.errors.enddate)}
                  helperText={formik.touched.enddate && formik.errors.enddate}
                  placeholder='Booking end date'
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
          Edit details of the booking:
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Licence number"
                  varient='filled'
                  style={textfieldstyle}
                  name='licencenumber'
                  onChange={formik.handleChange}
                  value={formik.values.licencenumber}
                  error={formik.touched.licencenumber && Boolean(formik.errors.licencenumber)}
                  helperText={formik.touched.licencenumber && formik.errors.licencenumber}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Price"
                  varient='filled'
                  style={textfieldstyle}
                  name='price'
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button type='submit' variant="contained" color='btn' style={btnstyle} >
          Save Details
        </Button>
      </Box>
    </Container>
  )
}

export default Bookings_Edit