import React from 'react'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

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

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startdate', headerName: 'Start Date', width: 100 },
    { field: 'enddate', headerName: 'End Date', width: 100 },
    { field: 'action', headerName: 'Actions', width: 200, renderCell: RenderButton },
];

const rows = [
    { id: 1, startdate: '2021-10-10', enddate: '2021-10-20'},

];

function Bookings_view() {
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