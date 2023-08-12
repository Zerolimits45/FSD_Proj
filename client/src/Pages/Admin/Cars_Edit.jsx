import React from 'react'
import { Typography, Grid, Container, TextField, Box, Button, Card, CardContent, MenuItem } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import http from '../../http'
import { useSnackbar } from 'notistack';
import { differenceInDays } from 'date-fns';

function Cars_Edit() {
  //fetching car list
  const [carList, setCarList] = useState(null);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [carPrice, setCarPrice] = useState(0);

  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white' }
  const textfieldstyle = { backgroundColor: 'white', borderRadius: '5px', margin: '10px 0' }
  const textstyle = { color: '#150039', fontWeight: 'bold' }
  const [imageFile, setImageFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      startDate: carList ? new Date(carList.startDate).toISOString().split('T')[0] : "",
      endDate: carList ? new Date(carList.endDate).toISOString().split('T')[0] : "",
      model: carList ? carList.model : "",
      make: carList ? carList.make : "",
      type: carList ? carList.type : "",
      gear: carList ? carList.gear : "",
      seats: carList ? carList.seats : "",
    },
    validationSchema: yup.object().shape({
      startDate: yup.string().trim().required('Start date is required'),
      endDate: yup.string().trim().required('End date is required')
        .test('is-after-or-equal-start-date', 'End date must be after start date', function (value) {
          const startDate = this.resolve(yup.ref('startDate'));
          return startDate && differenceInDays(new Date(value), new Date(startDate)) >= 0;
        }),
      model: yup.string().trim().required('Model is required'),
      make: yup.string().trim().required('Make is required'),
      type: yup.string().trim().required('Type is required'),
      gear: yup.string().trim().required('Gear is required'),
      seats: yup.number().required('Seats is required'),
    }),
    onSubmit: (data) => {
      if (imageFile) {
        data.imageFile = imageFile;
      }
      data.startDate = data.startDate.trim();
      data.endDate = data.endDate.trim();
      data.model = data.model.trim();
      data.make = data.make.trim();
      data.type = data.type.trim();
      data.gear = data.gear.trim();
      data.price = carPrice
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

      if (res.data && res.data.type) {
        if (res.data.type === 'Sedan') {
          setCarPrice(40);
        } else if (res.data.type === 'SUV') {
          setCarPrice(50);
        } else if (res.data.type === 'Minivan') {
          setCarPrice(60);
        }
      }
    })
  }, []);

  const onFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        enqueueSnackbar('Maximun file size is 1MB', { variant: 'error' });
        return;
      }
      let formData = new FormData();
      formData.append('file', file);
      http.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          setImageFile(res.data.filename);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  };
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
                  label='Car type'
                  varient='filled'
                  style={textfieldstyle}
                  name='type'
                  onChange={(e) => {
                    formik.handleChange(e);
                    const selectedType = e.target.value;
                    if (selectedType === 'Sedan') {
                      setCarPrice(40);
                    } else if (selectedType === 'SUV') {
                      setCarPrice(50);
                    } else if (selectedType === 'Minivan') {
                      setCarPrice(60);
                    }
                  }}
                  value={formik.values.type}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                  fullWidth
                  select
                >
                  <MenuItem value='Sedan'>Sedan</MenuItem>
                  <MenuItem value='SUV'>SUV</MenuItem>
                  <MenuItem value='Minivan'>Minivan</MenuItem>
                </TextField>
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
                  label='Price per day'
                  type='number'
                  varient='filled'
                  style={textfieldstyle}
                  name='price'
                  value={carPrice}
                  fullWidth
                  disabled
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
            <Box sx={{ mt: 2 }} >
              <Button variant="contained" color='btn' style={btnstyle} component="label">
                Upload Image
                <input hidden accept="image/*" multiple type="file"
                  onChange={onFileChange} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardContent>
                {
                  (imageFile || carList?.imageFile) && (
                    <Box component="img" alt="car image" width="100%" height="600px" style={{ objectFit: 'contain' }}
                      src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile ? imageFile : carList?.imageFile}`}>
                    </Box>
                  )
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button type='submit' variant="contained" color='btn' style={btnstyle} >
          Save Details
        </Button>
      </Box>
    </Container>
  )
}

export default Cars_Edit