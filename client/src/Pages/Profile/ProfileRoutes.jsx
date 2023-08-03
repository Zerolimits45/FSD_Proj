import React from 'react'
import { useState, useContext } from 'react'
import { Collapse, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Grid, Card } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'
import Registered_Cars from './Registered_Cars'
import Registered_Cars_Edit from './Registered_Cars_Edit'
import Bookings from './Bookings'
import Rating_Booking from './Rating_Booking'
import Account from './Account'
import Account_Edit from './Account_Edit'
import Password_Edit from './Password_Edit'
import Help from './Help'
import Discussion from './Discussion'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HelpIcon from '@mui/icons-material/Help';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ProfileRoutes() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2} marginTop={10}>
                <Grid item xs={12} sm={3}>
                    <Card>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <AccountCircleIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/profile/account' >
                                    <ListItemText primary="Account" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <DirectionsCarIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/profile/registered_cars' >
                                    <ListItemText primary="My Cars" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <LibraryBooksIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/profile/bookings' >
                                    <ListItemText primary="My Bookings" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <MailOutlineIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/profile/discussion' >
                                    <ListItemText primary="My Posts" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <HelpIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton onClick={handleClick}>
                                    <ListItemText primary="Help" />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} LinkComponent={Link} to='/profile/help'>
                                        <ListItemIcon>
                                            <FeedbackIcon color='primary' />
                                        </ListItemIcon>
                                        <ListItemText primary="Feedback" />
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} LinkComponent={Link} to='/profile/help'>
                                        <ListItemIcon>
                                            <FeedbackIcon color='primary' />
                                        </ListItemIcon>
                                        <ListItemText primary="Cancel Booking Request" />
                                    </ListItemButton>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} LinkComponent={Link} to='/profile/help'>
                                        <ListItemIcon>
                                            <FeedbackIcon color='primary' />
                                        </ListItemIcon>
                                        <ListItemText primary="Car Removal Request" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Routes>
                        <Route path="/account" element={<Account />} />
                        <Route path="/account/edit" element={<Account_Edit />} />
                        <Route path="/account/changepassword" element={<Password_Edit />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/bookings/rating/:id" element={<Rating_Booking />} />
                        <Route path="/registered_cars" element={<Registered_Cars />} />
                        <Route path="/registered_cars/edit/:id" element={<Registered_Cars_Edit />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/discussion" element={<Discussion />} />
                    </Routes>
                </Grid>
            </Grid>
        </Container>


    )
}

export default ProfileRoutes