import React from 'react'
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
function AdminRoutes() {
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
                                    <ListItemText primary="Users" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
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
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<User_view />} />
                        <Route path="/cars" element={<Cars_view />} />
                        <Route path="/cars/edit/:id" element={<Cars_Edit />} /> 
                        <Route path="/bookings" element={<Bookings_view />} />
                        <Route path="/bookings/edit" element={<Bookings_Edit />} />
                    </Routes>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminRoutes