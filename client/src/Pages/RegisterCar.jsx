import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

function RegisterCar() {
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white',backgroundColor: '#FF4E00' }

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
      model: '',
      make: '',
      type: '',
      gear: '',
      seats: '',
      price: '',
      name: '',
      email: '',
      license: '',

    },
    validationSchema: yup.object().shape({
      startDate: yup.string().trim().required('Start date is required'),
      endDate: yup.string().trim().required('End date is required'),
      model: yup.string().trim().required('Model is required'),
      make: yup.string().trim().required('Make is required'),
      type: yup.string().trim().required('Type is required'),
      gear: yup.string().trim().required('Gear is required'),
      seats: yup.string().trim().required('Seats is required'),
      price: yup.string().trim().required('Price is required'),
      name: yup.string().trim().required('Name is required'),
      email: yup.string().trim().email('Email must be valid').required('Email is required'),
      license: yup.string().trim().required('License is required'),

    }),
    onSubmit: (data) => {
      data.startDate = data.startDate.trim();
      data.endDate = data.endDate.trim();
      data.model = data.model.trim();
      data.make = data.make.trim();
      data.type = data.type.trim();
      data.gear = data.gear.trim();
      data.seats = data.seats.trim();
      data.price = data.price.trim();
      data.name = data.name.trim();
      data.email = data.email.trim();
      data.license = data.license.trim();
      console.log(data);
    },
  });
  return (
    <Container maxWidth='xl' >
      <Box>
        <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
          Select the time period you want to register your car in:
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
                placeholder='Registration start date'
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
                placeholder='Registration end date'
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
            Please fill in your car details:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='model'
                onChange={formik.handleChange}
                value={formik.values.model}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
                placeholder='Car model'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='make'
                onChange={formik.handleChange}
                value={formik.values.make}
                error={formik.touched.make && Boolean(formik.errors.make)}
                helperText={formik.touched.make && formik.errors.make}
                placeholder='Car make'
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='type'
                onChange={formik.handleChange}
                value={formik.values.type}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
                placeholder='Car Type'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='gear'
                onChange={formik.handleChange}
                value={formik.values.gear}
                error={formik.touched.gear && Boolean(formik.errors.gear)}
                helperText={formik.touched.gear && formik.errors.gear}
                placeholder='Gear type'
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='seats'
                onChange={formik.handleChange}
                value={formik.values.seats}
                error={formik.touched.seats && Boolean(formik.errors.seats)}
                helperText={formik.touched.seats && formik.errors.seats}
                placeholder='No. of Seats'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='registration'
                type='date'
                onChange={formik.handleChange}
                value={formik.values.registration}
                error={formik.touched.registration && Boolean(formik.errors.registration)}
                helperText={formik.touched.registration && formik.errors.registration}
                placeholder='Date of Registration'
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='price'
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                placeholder='Price per day'
                fullWidth
              />
            </Grid>
          </Grid>
          {/* upload image of car */}
          <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
            Please upload an image of your car:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span" style={{ backgroundColor: '#FF4E00', color: 'white' }}>
                  Upload Image
                </Button>
              </label>
            </Grid>
          </Grid>
          <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
            and this car belongs to:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder='Driver Name'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder='Driver email'
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                varient='filled'
                style={textfieldstyle}
                name='license'
                onChange={formik.handleChange}
                value={formik.values.license}
                error={formik.touched.license && Boolean(formik.errors.license)}
                helperText={formik.touched.license && formik.errors.license}
                placeholder='Driver lisence number'
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type='submit' variant="contained" style={btnstyle} fullWidth>
            Register your car with us
          </Button>
        </form>
      </Box>
    </Container >


  )
}

export default RegisterCar