import React from 'react'
import { Collapse, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Grid, Card } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'
import User_view from './User_view'
import Cars_view from './Cars_view'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Bookings_view from './Bookings_view'
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
                                <ListItemButton>
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
                        <Route path="/users" element={<User_view />} />
                        <Route path="/cars" element={<Cars_view />} />
                        <Route path="/bookings" element={<Bookings_view />} />
                    </Routes>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminRoutes