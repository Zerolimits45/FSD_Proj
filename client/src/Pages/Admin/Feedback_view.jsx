import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    const { feedback } = props;
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
                    Delete Feedback
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Feedback?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={() => {
                            http.delete(`/profile/help/${feedback.id}`).then((res) => {
                                console.log(res.data)
                                navigate('/admin/feedback')
                            });
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
function Feedback_view() {
    const [feedbackList, setFeedbackList] = useState([]);
    useEffect(() => {
        http.get('/profile/help/view').then((res) => {
            setFeedbackList(res.data);
        })
    }, [feedbackList])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 80 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'reason', headerName: 'Reason', width: 450 },
        { field: 'action', headerName: 'Actions', width: 200, renderCell: (params) => <RenderButton feedback={params.row} /> },
    ];
    const rows = feedbackList.map((feedback) => ({
        id: feedback.id,
        name: feedback.name,
        email: feedback.email,
        reason: feedback.reason
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

export default Feedback_view