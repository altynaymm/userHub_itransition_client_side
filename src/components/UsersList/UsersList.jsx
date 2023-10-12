import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { blockUsers,  checkSession,  deleteUser, getUserLogOut, getUsersList, unblockUsers } from '../../../redux/Thunk/user.thunk';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AlertMessage from '../AlertMessage/AlertMessage';

const columns = [

  {
    field: 'fullName',
    headerName: 'Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'e-Mail',
    type: 'string',
    width: 300,
  },
  {
    field: 'createdAt',
    headerName: 'Sign-up Date',
    type: 'Date',
    width: 300,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleString(); 
    },
  },
  {
    field: 'lastLoginDate',
    headerName: 'Last Login Date',
    width: 200,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleString(); 
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'enum',
    width: 300,
  },
];


export default function UsersList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function checkUserSession() {
      try {
        await dispatch(checkSession());
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false); 
      }
    }
  
    checkUserSession();
  }, []);
  

  const isAuthenticate = useSelector(state => state.userReducer.authUser);
  console.log(isAuthenticate);

  if (!isAuthenticate && !isLoading) {
    navigate('/sign-in');
  }

 
  React.useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const usersList = useSelector(state => state.usersListReducer.users);
  console.log(usersList);

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    if (usersList) {
      setUsers(usersList);
    }
  }, [usersList]);


  const [selectedUsers, setSelectedUsers] = React.useState([]);
  console.log(selectedUsers);


  const handleSelectionChange = (newSelection) => {
    console.log(selectedUsers);
    setSelectedUsers(newSelection);
  };
  
  const sessionUser = useSelector(state => state.userReducer.user);

  const handleDelete = async () => {
    console.log("Selected User IDs to Delete:", selectedUsers);
    await dispatch(deleteUser(selectedUsers));
    if (selectedUsers.includes(sessionUser.id)) {
      await alert('Your account has been deleted, redirecting to main page')
      dispatch(getUserLogOut());
    }
  };

  const handleBlock = async () => {
      await dispatch(blockUsers(selectedUsers));
      if (selectedUsers.includes(sessionUser.id)) {
        await alert('Your account has been blocked, redirecting to main page')
        dispatch(getUserLogOut());
      }
  }
  
  const handleUnBlock = () => {
    dispatch(unblockUsers(selectedUsers));
  }

  return (
    <>
      <Header />
    <AlertMessage/>
      <div className='list' style={{ marginTop: 100, height: 400, width: '100%', }}>
        <div style={{ marginBottom: 30 }}>
          <Button variant="outlined" style={{ marginRight: 10 }} startIcon={<BlockIcon />} onClick={handleBlock} > Block</Button>
          <Button variant="outlined" style={{ marginRight: 10 }} startIcon={<LockOpenIcon />} onClick={handleUnBlock} />
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} />
        </div>

        {users.length > 0 && (
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
        )}
      </div>
    </>
  );
}
