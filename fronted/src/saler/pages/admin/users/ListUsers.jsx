import { useState,useEffect } from 'react'
import NavBarSaler from '../../../general/NavBarSale'
import storage from '../../../../storage/Storage'
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
import '../../../../css/Searching.css'
import { usersApi } from '../../../../apis/QueryAxios'
import NotFound from "../../../../general/NotFound.jsx";
import SessionsUser from "./SessionsUser.jsx";
import {handleResponse} from "../../../../general/HandleResponse.jsx";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
const styleAlarm = {
  position: 'absolute',
  top: '170px',
  left: '48%',
  borderRadius: '8px'
};



function ListUsers() {
  const [users,setUser] = useState([])
  const [userFilter,setUserFilter] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [usersxPage,setusersxPage] = useState(10)
  const [firstPage,setFirstPage] = useState(0)
  const [lastPage,setLastPage] = useState(usersxPage)
  const [totalPages,setTotalPages] = useState(0)
  const [page,setPage] = useState(1)
  const[search,setSearch] = useState("")
  const [order,setOrder] = useState('id')
  const [roles,setRoles] = useState([])


  const enviarMessage = (msg) =>{
    notification_succes(msg)
    setSearch('')
  }
  const getAllUser = async () =>{
    try
    {
      setLoading(true)
      const token = storage.get('authToken')
      const response = await usersApi.get('',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setLoading(false)
      setUser(response.data.users)
      setRoles(response.data.roles)
      setUserFilter(response.data.users.slice(firstPage,lastPage))
      setTotalPages(Math.ceil(response.data.length/usersxPage))


    }
    catch(e){
      setLoading(false)
      handleResponse(e,navigate)
    }

  }

  const order_by = (filtrar,type_order) => {
    const role_order = filtrar.sort((a,b) =>{
      if(a[type_order] < b[type_order]){
        return -1
      }
      if(a[type_order] > b[type_order]){
        return 1
      }
      return 0
    })
    return role_order
  }


  const update_page = async (value,change,user_x_page,order_type ) => {
    order_by(users,order_type)
    if(change) {
      const filter = change
      const user_filtered = users.filter((dato) =>
          dato.name.toLowerCase().includes(filter.toLocaleLowerCase())
      )
        if(user_filtered){
          const pages_filtered = Math.ceil(user_filtered.length/user_x_page)
          setTotalPages(pages_filtered)
        }
        else {
          setTotalPages(0)
        }

        if (value == 1) {
          const first = 0
          const second = value * user_x_page
          setFirstPage(first)
          setLastPage(second)
          setUserFilter(user_filtered.slice(first, second))

        } else {
          const first = (value - 1) * user_x_page
          const second = value * user_x_page
          setFirstPage(first)
          setLastPage(second)
          setUserFilter(user_filtered.slice(first, second))
        }
    }
    else {
      if (value == 1) {
        const first = 0
        const second = value * user_x_page
        setFirstPage(first)
        setLastPage(second)
        setUserFilter(users.slice(first, second))

      } else {
        const first = (value - 1) * user_x_page
        const second = value * user_x_page
        setFirstPage(first)
        setLastPage(second)
        setUserFilter(users.slice(first, second))
      }
      setTotalPages(Math.ceil(users.length/user_x_page))
    }
    setPage(value)
  };


  const searcher =  (e) => {
    setPage(1)
    setSearch(e.target.value)
  }

  const update_user_xpage = (e) =>
  {
    if(e.target.value != 0) {
      setusersxPage(e.target.value)
      setPage(1)
    }
  }

  const changeOrderBy = (e) =>{
    setOrder(e.target.value)
  }
  const onchange_page = (event,value) =>{
    setPage(value)
  }



  useEffect (() =>{
    getAllUser()
  },[])

  useEffect (() =>{
    update_page(page,search,usersxPage,order)
  },[search,usersxPage,page,users,order])

  return (
    <>
    <NavBarSaler/>
      <Typography sx={{
        top: '90px',
        position: 'absolute',
        left: '10%',
        width: '80%',}} >
        <div className='contenedor'>
          <input type='text' placeholder='Buscar Usuario' onChange={searcher} value={search} />
          <TravelExploreIcon className="icon" />
        </div>

      </Typography>
      <Box sx={{
        top: '90px',
        position: 'absolute',
        right: '50px'}} >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={order}
                label="Order By"
                onChange={changeOrderBy}
            >
              <MenuItem value='name'>Nombre</MenuItem>
              <MenuItem value='id'>ID</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

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
          <>
            {userFilter.length !=0 ?(
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
              {userFilter.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.users.active_user')) ?
                        (<ActiveUser
                           user={user}
                           users={users}
                           setUser={setUser}
                           getAllUser={getAllUser}
                           enviarMessage={enviarMessage}
                       />):null}
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
                      <Box display="flex">
                        <Box sx={{ paddingLeft: 10 }}>
                          {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.users.update')) ?
                              (<EditUser
                                roles={roles}
                                user={user}
                                users={users}
                                setUser={setUser}
                                getAllUser={getAllUser}
                                enviarMessage={enviarMessage}
                            />):null}
                        </Box>
                        <Box sx={{ paddingLeft: 10 }}>
                          {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.users.show_tokens')) ?
                            (<SessionsUser
                                user={user}
                                getAllUser={getAllUser}
                                enviarMessage={enviarMessage}
                            />):null}
                        </Box>
                      </Box>
                    </StyledTableCell>

                  </StyledTableRow>
              ))}
            </TableBody>
            <Stack spacing={2}>
              <Typography>
                <div >
                  <input style={{width:'70px'}} className='input-group-text' type='number' value={usersxPage} onChange={update_user_xpage}/>
                </div>
              </Typography>
              <Pagination variant="outlined" count={totalPages} onChange={onchange_page} page={page}/>
            </Stack>
           

          </Table>):
                <Box sx={styleAlarm}>
                  <NotFound/>
                </Box>}
          </>}
      <ToastContainer/>

    </>
  )
}

export default ListUsers