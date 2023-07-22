import React from 'react'
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Card } from '@mui/material'
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
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({});
    }
  }, [hasFocus]);

  return (
    <>
      <Button
        ref={buttonElement}
        variant="contained"
        size="small"
        style={{backgroundColor:'#6CA0DC'}}
      >
        Edit
      </Button>
      <Button
        ref={buttonElement}
        variant="contained"
        size="small"
        style={{ marginLeft: 16, backgroundColor:'#C70000' }}
      >
        Delete
      </Button>
    </>


  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 100 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'Phone', headerName: 'Phone', width: 100 },
  { field: 'Role', headerName: 'Role', width: 100 },
  { field: 'action', headerName: 'Actions', width: 200, renderCell: RenderButton},
];

const rows = [
  { id: 1, Name: 'Snow', Email: 'zerolimits45@gmail.com', Phone: '81268301', Role: 'Customer' },
  
];

function User_view() {
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

    // <Table sx={{ minWidth: 650 }}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Name</TableCell>
    //         <TableCell align="right">Calories</TableCell>
    //         <TableCell align="right">Fat</TableCell>
    //         <TableCell align="right">Carbs</TableCell>
    //         <TableCell></TableCell>
    //       </TableRow>
    //     </TableHead>
    // </Table>
  )
}

export default User_view