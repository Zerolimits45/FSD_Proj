import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    const { booking } = props;


    const handleCompleteBooking = () => {
        http.put(`/booking/complete/${booking.id}`).then((res) => {
            console.log(res.data);
        });
    }

    return (
        <>
            <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: '#6CA0DC' }}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 16, backgroundColor: '#C70000' }}
            >
                Delete
            </Button>
            <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 16, backgroundColor: '#228B22' }}
                onClick={handleCompleteBooking}
            >
                Complete Booking
            </Button>
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
    }, [bookingList.map((booking) => booking.status)])

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