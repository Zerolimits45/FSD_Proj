import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import http from '../../http'
import { useSnackbar } from 'notistack';

function Bookings_Edit() {
    const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
    const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
    const textstyle = { color: '#150039', fontWeight: 'bold' }
    
    const [bookingList, setBookingList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            startDate: bookingList ? new Date(bookingList.startDate).toISOString().split('T')[0] : "",
            endDate: bookingList ? new Date(bookingList.endDate).toISOString().split('T')[0] : "",
            licencenumber: bookingList ? bookingList.licencenumber : "",
            price: bookingList ? bookingList.price : "",
        },
        validationSchema: yup.object().shape({
            startDate: yup.string().trim().required('Start date is required'),
            endDate: yup.string().trim().required('End date is required'),
            licencenumber: yup.string().trim().required('Licence number is required'),
            price: yup.number().required('Price is required'),
        }),
        onSubmit: (data) => {
            data.startDate = data.startDate.trim();
            data.endDate = data.endDate.trim();
            data.licencenumber = data.licencenumber.trim();
            console.log(data);

            http.put('/booking/' + id, data)
                .then((res) => {
                    enqueueSnackbar('Booking details saved', { variant: 'success' });
                    console.log(res.data);
                }
                )
        },
        enableReinitialize: true
    });
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
                  name='startDate'
                  type='date'
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                  placeholder='Booking start date'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  varient='filled'
                  style={textfieldstyle}
                  name='endDate'
                  type='date'
                  onChange={formik.handleChange}
                  value={formik.values.endDate}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                  helperText={formik.touched.endDate && formik.errors.endDate}
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
                  value={formik.values.model}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                  helperText={formik.touched.model && formik.errors.model}
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
                  value={formik.values.make}
                  error={formik.touched.make && Boolean(formik.errors.make)}
                  helperText={formik.touched.make && formik.errors.make}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Box>
    </Container>
  )
}

export default Bookings_Edit