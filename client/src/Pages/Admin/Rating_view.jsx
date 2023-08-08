import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Rating } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import http from '../../http'

function RenderButton(props) {
    const { ratingId } = props;
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
                    Delete Rating
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Rating?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={() => {
                            http.delete(`/profile/rate/${ratingId}`).then((res) => {
                                console.log(res.data)
                                navigate('/admin/ratings')
                            });
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function Stars(props) {
    const { value } = props;
    return (
        <Rating
            name="rating"
            size="small"
            value={value}
            readOnly
        />
    )
}

function Rating_view() {
    const [ratingList, setRatingList] = useState([]);
    useEffect(() => {
        http.get('/profile/rate').then((res) => {
            setRatingList(res.data);
        })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'license', headerName: 'License', width: 100 },
        { field: 'rating', headerName: 'Rating', width: 120, renderCell: (params) => <Stars value={params.row.rating} /> },
        { field: 'feedback', headerName: 'Feedback', width: 300 },
        { field: 'action', headerName: 'Actions', width: 400, renderCell: (params) => <RenderButton ratingId={params.row.id} /> },
    ];
    const rows = ratingList.map((rating) => ({
        id: rating.id,
        license: rating.booking.licencenumber,
        rating: rating.rate,
        feedback: rating.feedback
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

export default Rating_view