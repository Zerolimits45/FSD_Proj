import * as React from 'react';
import { Container, Box, Paper, Grid, Typography, Button, Divider, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }} display={'flex'} flexDirection={'column'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant='h3' fontWeight={700} color={'white'} marginTop={15} marginLeft={10}>
              Save <span style={{ color: '#FF4E00' }}>big</span> with car rentals
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <img src="../images/Group 7.png" alt="" style={{ width: '100%' }} />
          </Grid>
        </Grid>

        <Button variant="contained" endIcon={<ArrowCircleRightIcon />}
          style={{ backgroundColor: '#FF4E00', color: 'white', borderRadius: 17, alignItems: 'center', margin: 'auto', width: 200, height: 50, fontSize: 20, fontWeight: 600 }}>
          Rent a Car </Button>

        <Grid container spacing={2} marginTop={10}>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' fontWeight={700} color={'white'} >
              Who Are We?
            </Typography>
            <Typography variant='h6' fontWeight={400} color={'white'} >
              We are a car rental company that provides you with the best car rental services in the country.

            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="../images/Home_img_1.jpg" alt="" style={{ width: '100%', borderRadius: '20px' }} />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={10}>
          <Grid item xs={12} md={6}>
          <img src="../images/Home_img_1.jpg" alt="" style={{ width: '100%', borderRadius: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
          <Typography variant='h4' fontWeight={700} color={'white'} >
              Why Choose Us?
            </Typography>
            <Typography variant='h6' fontWeight={400} color={'white'} >
             Because we have affordable prices and the best cars in the country.
            </Typography>
          </Grid>
        </Grid>
      </Box>


    </Container>
  );
}
