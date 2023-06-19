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

        <Typography variant='h6' fontWeight={600} color={'white'} style={{ alignItems: 'center', margin: 'auto', marginTop: 80 }}>
          FAQ
        </Typography>
        <Divider style={{ backgroundColor: 'white', marginTop: 20, marginBottom: 50, width: 150, height: 3, alignItems: 'center', margin: 'auto' }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                <Typography variant='body' fontWeight={600}>
                  How do i request a ride?
                </Typography>
                <br />
                <Typography variant='body' fontWeight={400}>
                  Sign up or log in to your account, enter your pickup and drop-off locations, and select the type of ride you need. Our system will match you with the most suitable driver, and you'll receive real-time updates on their estimated arrival time.
                </Typography>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                <Typography variant='body' fontWeight={600}>
                  How can I pay for my rides?
                </Typography>
                <br />
                <Typography variant='body' fontWeight={400}>
                  We offer a variety of convenient payment options, including credit or debit cards, mobile wallets, and in-app payment systems like Apple Pay and Google Pay. Your selected payment method will be securely saved in your account for future use.                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                <Typography variant='body' fontWeight={600}>
                  How can I contact customer support?
                </Typography>
                <br />
                <Typography variant='body' fontWeight={400}>
                  If you have any questions or need assistance, our dedicated customer support team is available 24/7. You can reach us through the websites' help center, where you'll find frequently asked questions and troubleshooting guides.
                </Typography>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <MiscellaneousServicesIcon sx={{ color: "#150039", marginRight: 3 }} />
                <Typography variant='body' fontWeight={600}>
                  What safety measures are in place?
                </Typography>
                <br />
                <Typography variant='body' fontWeight={400}>
                  Your safety is our top priority. We carefully screen all drivers, ensuring they meet our rigorous standards and have a clean driving record. Additionally, we implement various safety features, such as GPS tracking, driver ratings and reviews, and in-app emergency assistance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Box>
    </Container>
  );
}
