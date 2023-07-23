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
    { field: 'model', headerName: 'Model', width: 70 },
    { field: 'make', headerName: 'Make', width: 70 },
    { field: 'type', headerName: 'Type', width: 70 },
    { field: 'gear', headerName: 'Gear', width: 100 },
    { field: 'seats', headerName: 'Seats', width: 70 },
    { field: 'price', headerName: 'Price', width: 70 },
    { field: 'action', headerName: 'Actions', width: 200, renderCell: RenderButton },
];

const rows = [
    { id: 1, model: 'Peugot', make: '406', type: 'Sedan', gear: 'Automatic', seats: '5', price: '100' },

];

function Cars_view() {
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

export default Cars_view