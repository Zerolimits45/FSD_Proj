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

      </Box>
    </Container>
  );
}
