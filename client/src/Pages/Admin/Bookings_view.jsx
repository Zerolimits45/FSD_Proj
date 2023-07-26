import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    const { hasFocus, value } = props;
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);

    React.useLayoutEffect(() => {
        if (hasFocus) {
            const input = buttonElement.current?.querySelector('input');
            input?.focus();
        } else if (rippleRef.current) {
            rippleRef.current.stop({});
        }
    }, [hasFocus]);

    return (
        <>
            <Button
                ref={buttonElement}
                variant="contained"
                size="small"
                style={{ backgroundColor: '#6CA0DC' }}
            >
                Edit
            </Button>
            <Button
                ref={buttonElement}
                variant="contained"
                size="small"
                style={{ marginLeft: 16, backgroundColor: '#C70000' }}
            >
                Delete
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
        { field: 'action', headerName: 'Actions', width: 200, renderCell: RenderButton },
    ];
    
    const [bookingList, setBookingList] = useState([]);
    useEffect(() => {
        http.get('/booking/user').then((res) => {
            setBookingList(res.data);
        })
    }, [])

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