import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    return (
        <>
            <Button
                LinkComponent={Link} to={`/admin/cars/edit/${carId}`}
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
                onClick={handleOpen}
            >
                Delete
            </Button>
        </>
    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Question', headerName: 'Question', width: 370 },
    { field: 'action', headerName: 'Actions', width: 200, renderCell: (params) => <RenderButton carId={params.row.id} /> },
];


function Discussions_View() {

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

export default Discussions_View