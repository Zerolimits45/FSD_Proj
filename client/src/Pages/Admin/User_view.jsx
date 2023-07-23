import React, { useEffect, useState, useContext } from 'react'
import { Box, Input, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import UserContext from '../../contexts/UserContext.js';
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

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 100 },
  { field: 'role', headerName: 'Role', width: 100 },
  { field: 'action', headerName: 'Actions', width: 200, renderCell: RenderButton },
];

function User_view() {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  const {user} = useContext(UserContext)

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getUsers = () => {
    http.get(`/user/profiles`).then((res) => {
      setUserList(res.data);
    });
  };

  const searchUsers = () => {
    http.get(`/user/profiles?search=${search}`).then((res) => {
      setUserList(res.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  };

  const onClickSearch = () => {
    searchUsers();
  }

  const onClickClear = () => {
    setSearch('');
    getUsers();
  };

  const rows = userList.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }));

  return (
    <>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 2 }}>
          <Input value={search} placeholder="Search"
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown} sx={{ mt: 2 }} />
          <IconButton color="primary"
            onClick={onClickSearch} sx={{ mt: 2 }}>
            <Search />
          </IconButton>
          <IconButton color="primary"
            onClick={onClickClear} sx={{ mt: 2 }}>
            <Clear />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {
            user && user.role == 'admin' && (
              <Link to='/admin/addstaff' style={{ textDecoration: 'none' }}>
                <Button variant='contained' sx={{ mt: 2, mr: 2 }}>
                  Add Staff
                </Button>
              </Link>
            )
          }
        </Box>
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
          sx={{height: 500}}
        />
      </div>
    </>
  );
}

export default User_view