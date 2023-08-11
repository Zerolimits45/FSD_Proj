import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    const { request } = props;
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
            <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: '#C70000' }}
                onClick={handleOpen}
            >
                Delete
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={() => {
                            http.delete(`/request/${request.id}`).then((res) => {
                                console.log(res.data)
                                navigate('/admin/request')
                            });
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
function Request_View() {
    const [requestList, setRequestList] = useState([]);
    useEffect(() => {
        http.get('/request').then((res) => {
            setRequestList(res.data);
        })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'request', headerName: 'Request', width: 250 },
        { field: 'action', headerName: 'Actions', width: 400, renderCell: (params) => <RenderButton request={params.row} /> },
    ];
    const rows = requestList.map((request) => ({
        id: request.id,
        request: request.request
    }));

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

export default Request_View