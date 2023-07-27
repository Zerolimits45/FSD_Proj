import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    const { booking } = props;
    const navigate = useNavigate();

    const handleCompleteBooking = () => {
        http.put(`/booking/complete/${booking.id}`).then((res) => {
            console.log(res.data);
        });
    }


    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: '#6CA0DC' }}
                LinkComponent={Link} to={`/admin/bookings/edit/${booking.id}`}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 16, backgroundColor: '#C70000' }}
                onClick={handleOpen}
            >
                Delete
            </Button>
            {
                booking.status != "Completed" && (
                    <Button
                        variant="contained"
                        size="small"
                        style={{ marginLeft: 16, backgroundColor: '#228B22' }}
                        onClick={handleCompleteBooking}
                    >
                        Complete Booking
                    </Button>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Booking
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this booking?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={() => {
                            http.delete(`/booking/${booking.id}`).then((res) => {
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

function Bookings_view() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'license', headerName: 'License', width: 100 },
        { field: 'startdate', headerName: 'Start Date', width: 120 },
        { field: 'enddate', headerName: 'End Date', width: 120 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'action', headerName: 'Actions', width: 400, renderCell: (params) => <RenderButton booking={params.row} /> },
    ];

    const [bookingList, setBookingList] = useState([]);
    useEffect(() => {
        http.get('/booking').then((res) => {
            setBookingList(res.data);
        })
    }, [bookingList])

    const rows = bookingList.map((booking) => ({
        id: booking.id,
        license: booking.licencenumber,
        startdate: booking.startdate.substring(0, 10),
        enddate: booking.enddate.substring(0, 10),
        price: booking.price,
        status: booking.status
    }))

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
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
            />
        </div>
    )
}

export default Bookings_view