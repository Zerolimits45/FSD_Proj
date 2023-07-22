import React from 'react'
import { Collapse, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Grid, Card } from '@mui/material'
import { Routes, Route, Link } from 'react-router-dom'
import User_view from './User_view'

function AdminRoutes() {
  return (
    <Container maxWidth='xl'>
    <Grid container spacing={2} marginTop={10}>
        <Grid item xs={12} sm={3}>
            <Card>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton LinkComponent={Link} to='/admin/users'>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Registered Cars" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary="Bookings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>
        </Grid>
        <Grid item xs={12} sm={9}>
            <Routes>
                <Route path="/users" element={<User_view/>} />
            </Routes>
        </Grid>
    </Grid>
</Container>
  )
}

export default AdminRoutes