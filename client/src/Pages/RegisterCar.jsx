import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Paper } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import http from '../http'
import { useSnackbar } from 'notistack';
import { useState } from 'react'

function RegisterCar() {
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const backbtnstyle = { margin: '20px 0', fontWeight: 'bold', color: '#150039', backgroundColor: '#FFFFFF' }
  const btnstyle = { margin: '20px 0', fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = useState(0);

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
      license: '',

    },
    validationSchema: yup.object().shape({
      startDate: yup.string().trim().required('Start date is required'),
      endDate: yup.string().trim().required('End date is required'),
      model: yup.string().trim().required('Model is required'),
      make: yup.string().trim().required('Make is required'),
      type: yup.string().trim().required('Type is required'),
      gear: yup.string().trim().required('Gear is required'),
      seats: yup.number().required('Seats is required'),
      price: yup.number().required('Price is required'),
      license: yup.string().trim().required('License is required'),

    }),
    onSubmit: (data) => {
      data.startDate = data.startDate.trim();
      data.endDate = data.endDate.trim();
      data.model = data.model.trim();
      data.make = data.make.trim();
      data.type = data.type.trim();
      data.gear = data.gear.trim();
      data.license = data.license.trim();
      console.log(data);
      http.post('/car/create', data)
        .then((res) => {
          enqueueSnackbar('Car registered successfully', { variant: 'success' });
          formik.resetForm();
        }
        )
    },
  });
  return (
    <Container maxWidth='xl' >
      <Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {step === 0 && (
            <>


              <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                Select the time period you want to register your car in:
              </Typography>
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
                <Grid item xs={12}>
                  <Button onClick={() => setStep(1)} style={btnstyle} fullWidth>
                    Next Step
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {step === 1 && (
            <>
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
                    type='number'
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
                    type='number'
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
                <Grid item xs={12} md={6}>
                  <Button onClick={() => setStep(0)} style={backbtnstyle} variant='outlined' fullWidth>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button onClick={() => setStep(2)} style={btnstyle} fullWidth>
                    Next Step
                  </Button>
                </Grid>

              </Grid>
            </>
          )}
          {step === 2 && (
            <>
              {/* upload image of car */}
              <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                Please upload an image of your car:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12} md={6}>
                  <Button onClick={() => setStep(2)} style={backbtnstyle} fullWidth>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button onClick={() => setStep(3)} style={btnstyle} fullWidth>
                    Next Step
                  </Button>
                </Grid>

              </Grid>
            </>
          )}
          {step === 3 && (
            <>
              <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
                and this car belongs to:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12} md={6}>
                  <Button onClick={() => setStep(0)} style={backbtnstyle} fullWidth>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth>
                    Register your car with us
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Container >


  )
}

export default RegisterCar