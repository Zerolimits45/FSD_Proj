import React, { useEffect, useState, useContext } from 'react'
import { Box, Input, IconButton, Button, Grid } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import UserContext from '../../contexts/UserContext.js';
import http from '../../http'

function RenderButton(props) {
    const { hasFocus, value, u } = props;
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);
    const { user } = useContext(UserContext)

    React.useLayoutEffect(() => {
        if (hasFocus) {
            const input = buttonElement.current?.querySelector('input');
            input?.focus();
        } else if (rippleRef.current) {
            rippleRef.current.stop({});
        }
    }, [hasFocus]);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {user.role == 'admin' && ( 
                <Button
                    ref={buttonElement}
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: '#6CA0DC' }}
                    LinkComponent={Link} to={`/admin/users/edit/${u.id}`}
                >
                    Edit
                </Button>
            )}

            {user.role == 'admin' && ( 
                <Button
                    ref={buttonElement}
                    variant="contained"
                    size="small"
                    style={{ marginLeft: 16, backgroundColor: '#C70000' }}
                    onClick={handleOpen}
                >
                    Delete
                </Button>
            )}


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete User
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={() => {
                            http.delete(`/user/${u.id}`).then((res) => {
                                console.log(res.data)
                                navigate('/admin/dashboard')
                            });
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </>


    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'action', headerName: 'Actions', width: 200, renderCell: (params) => <RenderButton u={params.row} /> },
];

function Staff_View() {
    const [userList, setUserList] = useState([]);
    const btnstyle = { fontWeight: 'bold', color: 'white', backgroundColor: '#FF4E00' }
    const { user } = useContext(UserContext)

    const getUsers = () => {
        http.get(`/user/profiles`).then((res) => {
            setUserList(res.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const users = userList.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    }));

    const rows = users.filter((user) => user.role == 'staff');

    return (
        <>
            {
                user.role == 'admin' && (
                    <Grid item xs={1.5}>
                        <Button type='submit' color='btn' variant="contained" style={btnstyle} fullWidth sx={{ marginBottom: '1em' }} LinkComponent={Link} to='/admin/staff/add'>
                            Add Staff
                        </Button>
                    </Grid>
                )
            }
            <div style={{ width: '100%', backgroundColor: 'white' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ height: 500 }}
                />
            </div>
        </>
    );
}

export default Staff_View