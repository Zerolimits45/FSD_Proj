import React, { useState, useEffect, useContext } from 'react';
import { Typography, Grid, Container, Box, Button, Card, CardContent, Divider, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import http from '../../http';
import UserContext from '../../contexts/UserContext.js';
import { differenceInDays } from 'date-fns';

function BookingCard({ booking }) {
  const completestyle = { backgroundColor: '#228B22', margin: '8px 0', fontWeight: 'bold', color: 'white' };
  const btnstyle = { margin: '8px 0', fontWeight: 'bold', color: 'white', marginLeft: '10px' };
  const dividerstyle = { backgroundColor: '#150039', fontWeight: 'bold', margin: '10px 0' };
  const textstyle = { color: '#150039' };

  const feedbackRate = booking.feedback[0]?.rate; // Use optional chaining to handle undefined
  const [value, setValue] = useState(feedbackRate);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Card elevation={5}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Box>
                  <img src={`${import.meta.env.VITE_FILE_BASE_URL}${booking.car.imageFile}`} alt="" width={'80%'} height={'300px'} style={{ objectFit: 'contain' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} display={'flex'} alignItems={'center'}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h5' fontWeight={600} style={textstyle}>
                    Booking Details:
                  </Typography>
                  <Typography variant='h5' fontWeight={600} style={textstyle}>
                    {booking.car.model} {booking.car.make} | {booking.car.type}
                  </Typography>
                  <Typography variant='h6' fontWeight={600} style={textstyle}>
                    <AccessTimeFilledIcon fontSize='small' /> {differenceInDays(new Date(booking.enddate), new Date(booking.startdate))} days
                  </Typography>
                  <Typography variant='h6' fontWeight={600} style={textstyle}>
                    Total: $ {booking.price}
                  </Typography>
                  <Divider style={dividerstyle} />
                  <Typography variant='h6' fontWeight={600} style={textstyle}>
                    Status: {booking.status}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'}>
                {booking.status === 'Completed' && booking.feedback.id === null ? (
                  <Button variant='contained' style={completestyle} LinkComponent={Link} to={`/profile/bookings/rating/${booking.id}`}>
                    Rate Experience
                  </Button>
                ) : (
                  booking.status === 'Completed' && booking.feedback.id !== null && (
                    <Rating
                      name={`rating-${booking.id}`}
                      size="large"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      sx={{
                        fontSize: "4rem",
                      }}
                      readOnly
                    />
                  )
                )}
                {booking.status !== 'Completed' && (
                  <Button color='btn' variant='contained' style={btnstyle}>
                    Cancel Booking
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function Bookings() {
  const { user } = useContext(UserContext);
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    http.get(`/booking/user/${user.id}`).then((res) => {
      console.log(res.data);
      setBookingList(res.data);
    });
  }, []);

  return (
    <Container maxWidth='xl'>
      <Typography variant='h6' color="white" marginBottom={2}>
        Your Bookings
      </Typography>
      {bookingList.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </Container>
  );
}

export default Bookings;