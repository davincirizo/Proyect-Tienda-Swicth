import { useState,useEffect } from 'react'
import NavBarSaler from '../../../general/NavBarSale'
import storage from '../../../../storage/Storage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {show_alert_danger} from "../../../../general/notifications/ShowAlert.jsx";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import {PulseLoader} from "react-spinners";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {ToastContainer} from "react-toastify";
import Chip from '@mui/material/Chip';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import ActiveUser from "./ActiveUser.jsx";
import EditUser from "./Edituser.jsx";
import './Searching.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#063970",
    color: theme.palette.common.white,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,

  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,

  },
}));

const styleContainer = {
  position: 'absolute',
  top: '170px',
  left: '10%',
  width: '80%',
  borderRadius: '8px'
};

const styleButtonFloat = {
  paddingTop: 2,
};


function ListUsers() {
  const url = import.meta.env.VITE_BACKEND_URL
  const [users,setUser] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const enviarMessage = (msg) =>{
    notification_succes(msg)
    setPage(1)
  }
  const getAllUser = async (value) =>{
    try
    {
      setLoading(true)
      const token = storage.get('authToken')
      const response = await axios.get(`${url}/admin/users?page=${value}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setLoading(false)
      setUser(response.data.users.data)
      setTotalPages(response.data.pages)
    }
    catch(e){
      setLoading(false)
      show_alert_danger(e.response.data.msg)
      navigate('/')
    }

  }
  useEffect (() =>{
    getAllUser()
  },[])
  const handleChange = (event, value) => {
    setPage(value);
    getAllUser(value)
  };

  const searcher =  async (e) => {

  }

  return (
    <>
    <NavBarSaler/>
      <Typography sx={{
        top: '90px',
        position: 'absolute',
        left: '10%',
        width: '80%',}} >
        <div className='contenedor'>
          <input type='text' onChange={searcher} />
          <TravelExploreIcon className="icon" />
        </div>
      </Typography>

      {loading ? (
              <div style={{
                position: 'absolute',
                left: '50%',
                top:'50%',
                transform: 'translateX(-50%)'}}>

                <PulseLoader

                    size={40}
                    color="#1C0E74"
                />
              </div>
          ):

          <Table sx={styleContainer}>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Roles</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                     <ActiveUser
                         user={user}
                         getAllUser={getAllUser}
                         enviarMessage={enviarMessage}
                     />
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell  align="center">
                      {user.roles.map((rol) => (
                          <div key={rol.id} style={{display: 'flex', justifyContent: 'center'}}>
                            <Stack  direction="row"  spacing={1}>
                              <Chip color="primary" label={rol.name} />
                            </Stack>
                          </div>
                        ))}
                    </StyledTableCell>


                    <StyledTableCell  align="center">
                      {/*<Box display="flex">*/}
                        <Box sx={{ paddingLeft: 10 }}>
                          <EditUser
                          user={user}
                          getAllUser={getAllUser}
                          enviarMessage={enviarMessage}
                          />
                        </Box>

                    </StyledTableCell>

                  </StyledTableRow>
              ))}
            </TableBody>
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination variant="outlined" count={totalPages} page={page} onChange={handleChange} />
            </Stack>
            <Box sx={styleButtonFloat}>
              {/*<CreateCategory*/}
              {/*    getAllCategory={getAllCategory}*/}
              {/*    enviarMessage={enviarMessage}/>*/}
            </Box>

          </Table>}
      <ToastContainer/>
    </>
  )
}

export default ListUsers