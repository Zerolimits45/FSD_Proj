
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarRentalIcon from '@mui/icons-material/CarRental';
import ForumIcon from '@mui/icons-material/Forum';

import { useState } from 'react';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" elevation={0}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setIsOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" flexGrow={[1,1,0]}>
                            WeGo
                        </Typography>
                        
                        <Box marginLeft={"1rem"} display={["none", "none", "flex"]} sx={{ flexGrow: 1 }}>
                            <Button color="inherit">Home</Button>
                            <Button color="inherit">Rent a Car</Button>
                            <Button color="inherit">Register a Car</Button>
                            <Button color="inherit">Discussions</Button>
                        </Box>
                        <Button color="inherit">Login/Register</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer
                anchor={'left'}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: {backgroundColor: '#150039',
                        color: '#fff'
                        }
                }}
            >
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon sx={{color:"white"}} />
                        </ListItemIcon>
                        <ListItemButton>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <CarRentalIcon sx={{color:"white"}} />
                        </ListItemIcon>
                        <ListItemButton>
                            <ListItemText primary="Rent a Car" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <NoCrashIcon sx={{color:"white"}} />
                        </ListItemIcon>
                        <ListItemButton>
                            <ListItemText primary="Register your car" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <ForumIcon sx={{color:"white"}} />
                        </ListItemIcon>
                        <ListItemButton>
                            <ListItemText primary="Discussions" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
        </>

    );
}