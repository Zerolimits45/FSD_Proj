import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import http from '../../http'
import { useSnackbar } from 'notistack';

function Registered_Cars_Edit() {
  //fetching car list
  const [carList, setCarList] = useState(null);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();


  const paperStyle = { width: '100%', marginTop: 10 }
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const textstyle = { color: '#150039', fontWeight: 'bold' }

  const formik = useFormik({
    initialValues: {
      startDate: carList ? new Date(carList.startDate).toISOString().split('T')[0] : "",
      endDate: carList ? new Date(carList.endDate).toISOString().split('T')[0] : "",
      model: carList ? carList.model : "",
      make: carList ? carList.make : "",
      type: carList ? carList.type : "",
      gear: carList ? carList.gear : "",
      seats: carList ? carList.seats : "",
      price: carList ? carList.price : "",
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
    }),
    onSubmit: (data) => {
      data.startDate = data.startDate.trim();
      data.endDate = data.endDate.trim();
      data.model = data.model.trim();
      data.make = data.make.trim();
      data.type = data.type.trim();
      data.gear = data.gear.trim();
      console.log(data);

      http.put('/car/' + id, data)
        .then((res) => {
          enqueueSnackbar('Car details saved', { variant: 'success' });
          console.log(res.data);
        }
        )
    },
    enableReinitialize: true
  });

  useEffect(() => {
    http.get('/car/' + id).then((res) => {
      setCarList(res.data);
      console.log(res.data);
    })
  }, [])


  return (
    <Container maxWidth='xl'>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant='h6' color="white" marginBottom={2}>
          Edit time period of your car registration:
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
          </CardContent>
        </Card>

        <Typography variant='h6' color="white" marginTop={10} marginBottom={2}>
          Edit details of your car:
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Car Model"
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
              label="Car make"
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
              label="Car Type"
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
              label="Gear type"
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
              label="No. of Seats"
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
             label="Price per day"
              varient='filled'
              style={textfieldstyle}
              name='price'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              placeholder='Price per day'
              fullWidth
            />
          </Grid>
        </Grid>
          </CardContent>
        </Card>
        
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
        <br />
        <Button type='submit' variant="contained" color='btn' style={btnstyle} >
          Save Details
        </Button>
      </Box>
    </Container>
  )
}

export default Registered_Cars_Edit