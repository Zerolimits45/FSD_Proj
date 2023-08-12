import React, { useContext } from 'react'
import { Collapse, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Grid, Card } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'
import User_view from './User_view'
import Cars_view from './Cars_view'
import Dashboard from './Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Bookings_view from './Bookings_view'
import Bookings_Edit from './Bookings_Edit'
import Cars_Edit from './Cars_Edit'
import Feedback_view from './Feedback_view'
import Rating_view from './Rating_view'
import User_Edit from './User_Edit'
import New_Staff from './New_Staff'
import Staff_View from './Staff_View'
import Request_View from './Request_View'
import UserContext from '../../contexts/UserContext.js';

function AdminRoutes() {
    const { user } = useContext(UserContext)

    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2} marginTop={10}>
                <Grid item xs={12} sm={3}>
                    <Card>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <DashboardIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/dashboard'>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <SupervisedUserCircleIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/users'>
                                    <ListItemText primary="Customers" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            {
                                (user.role == 'admin' || user.role == 'staff') && (
                                    <>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SupervisedUserCircleIcon color='primary' />
                                            </ListItemIcon>
                                            <ListItemButton LinkComponent={Link} to='/admin/staff'>
                                                <ListItemText primary="Staff" />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                            }
                            <ListItem>
                                <ListItemIcon>
                                    <DirectionsCarIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/cars'>
                                    <ListItemText primary="Registered Cars" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <LibraryBooksIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/bookings'>
                                    <ListItemText primary="Bookings" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <LibraryBooksIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/rating'>
                                    <ListItemText primary="Rating" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <LibraryBooksIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/feedback'>
                                    <ListItemText primary="Feedback" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <LibraryBooksIcon color='primary' />
                                </ListItemIcon>
                                <ListItemButton LinkComponent={Link} to='/admin/request'>
                                    <ListItemText primary="Request" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<User_view />} />
                        <Route path="/users/edit/:id" element={<User_Edit />} />
                        <Route path="/cars" element={<Cars_view />} />
                        <Route path="/cars/edit/:id" element={<Cars_Edit />} />
                        <Route path="/bookings" element={<Bookings_view />} />
                        <Route path="/bookings/edit/:id" element={<Bookings_Edit />} />
                        <Route path="/feedback" element={<Feedback_view />} />
                        <Route path="/rating" element={<Rating_view />} />
                        <Route path="/staff" element={<Staff_View />} />
                        <Route path="/staff/add" element={<New_Staff />} />
                        <Route path="/request" element={<Request_View />} />
                    </Routes>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminRoutes