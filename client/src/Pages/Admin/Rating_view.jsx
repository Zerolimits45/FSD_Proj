import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';

function RenderButton(props) {

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
        </>
    );
}

function Rating_view() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'license', headerName: 'License', width: 100 },
        { field: 'rating', headerName: 'Rating', width: 120 },
        { field: 'feedback', headerName: 'Feedback', width: 120 },
        { field: 'action', headerName: 'Actions', width: 400, renderCell: (params) => <RenderButton booking={params.row} /> },
    ];
    const rows = [
    ];
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

export default Rating_view