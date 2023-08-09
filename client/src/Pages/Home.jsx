import * as React from 'react';
import { Container, Box, Paper, Grid, Typography, Button, Divider, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import zIndex from '@mui/material/styles/zIndex';

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
              Welcome to WeGo,
            </Typography>
            <Typography variant='h6' fontWeight={400} color={'white'} >
              Your ultimate destination for seamless, comfortable, and unforgettable journeys. As a premier car rental company, we are dedicated to providing you with exceptional service, a diverse fleet of vehicles, and a commitment to making every mile of your adventure extraordinary.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="../images/Home_img_1.jpg" alt="" style={{ width: '100%', borderRadius: '10px 100px' }} />          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={10}>
          <Grid item xs={12} md={6}>
            <img src="../images/Home_img_2.jpeg" alt="" style={{ width: '100%', borderRadius: '10px 100px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' fontWeight={700} color={'white'} >
              Quality and Safety
            </Typography>
            <Typography variant='h6' fontWeight={400} color={'white'} >
              Your safety is paramount to us. Our vehicles undergo rigorous inspections and maintenance to ensure they're in top condition before you drive away. We strive to provide you with the highest quality vehicles that meet the highest safety standards.
            </Typography>
          </Grid>
        </Grid>
      </Box>


    </Container>
  );
}
