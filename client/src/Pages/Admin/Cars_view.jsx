import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import http from '../../http'


function RenderButton(props) {
    const { carId } = props;

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
    { field: 'action', headerName: 'Actions', width: 200, renderCell:(params) => <RenderButton carId={params.row.id} />  },
];

function Cars_view() {

    const [carList, setCarList] = useState([]);
    useEffect(() => {
        http.get('/car/all').then((res) => {
            setCarList(res.data);
        })
    }, [])


    const rows = carList.map((car) => ({
        id: car.id,
        model: car.model,
        make: car.make,
        type: car.type,
        gear: car.gear,
        seats: car.seats,
        price: car.price,
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

export default Cars_view