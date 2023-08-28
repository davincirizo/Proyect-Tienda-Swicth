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
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import '../../../../css/Searching.css'
import { roleApi } from '../../../../apis/QueryAxios'
import EditRole from "./EditRole.jsx";
import CreateRole from "./CreateRole.jsx";
import DeleteRole from "./DeleteRole.jsx";
import NotFound from "../../../../general/NotFound.jsx";
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
  
  const styleButtonFloat = {
    paddingTop: 2,
  };

const styleAlarm = {
    position: 'absolute',
    top: '170px',
    left: '48%',
    borderRadius: '8px'
};

function ListRoles() {
    const [roles,setRoles] = useState([])
    const [rolesFilter,setRolesFilter] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [usersxPage,setusersxPage] = useState(10)
    const [firstPage,setFirstPage] = useState(0)
    const [lastPage,setLastPage] = useState(usersxPage)
    const [totalPages,setTotalPages] = useState(0)
    const [page,setPage] = useState(1)
    const[search,setSearch] = useState("")
    const [order,setOrder] = useState('id')


    const getAllRoles = async () =>{
        try
        {
          setLoading(true)
          const token = storage.get('authToken')
          const response = await roleApi.get('',{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          setLoading(false)
          setRoles(response.data)
          console.log(response.data)
          setRolesFilter(response.data.slice(firstPage,lastPage))
          setTotalPages(Math.ceil(response.data.length/usersxPage))
        }
        catch(e){
          setLoading(false)
          show_alert_danger(e.response.data.msg)
          navigate('/')
        }
    
      }

      
      const update_user_xpage = (e) =>
      {
          if(e.target.value != 0) {
              setusersxPage(e.target.value)
              setPage(1)
          }
      }
      const searcher = (e) => {
        setPage(1)
        setSearch(e.target.value)
      }

    const onchange_page = (event,value) =>{
        setPage(value)
    }

    const enviarMessage = (msg) =>{
      notification_succes(msg)
      setSearch('')
    }

    const changeOrderBy = (e) =>{
        setOrder(e.target.value)
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

    const update_page =  (value,change,user_x_page ,order_type) =>
    {
        order_by(roles,order_type)
        if(change) {
            const filter = change
            const roles_filtered = roles.filter((dato) =>
                dato.name.toLowerCase().includes(filter.toLocaleLowerCase())
            )
            if(roles_filtered){
                const pages_filtered = Math.ceil(roles_filtered.length/user_x_page)
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
                setRolesFilter(roles_filtered.slice(first, second))

            } else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setRolesFilter(roles_filtered.slice(first, second))
            }
        }
        else {
            if (value == 1) {
                const first = 0
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setRolesFilter(roles.slice(first, second))

            } else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setRolesFilter(roles.slice(first, second))
            }
            setTotalPages(Math.ceil(roles.length/user_x_page))

        }
        setPage(value)
    };



      useEffect (() =>{
        getAllRoles()
      },[])

    useEffect (() =>{
        update_page(page,search,usersxPage,order)
      },[search,usersxPage,page,roles,order])


  return (
    <>
    <NavBarSaler/>
    <Typography sx={{
        top: '90px',
        position: 'absolute',
        left: '10%',
        width: '80%',}} >
        <div className='contenedor'>
          <input type='text' placeholder='Buscar Rol' onChange={searcher} value={search} />
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
              {rolesFilter.length !=0 ?(
          <Table sx={styleContainer}>
          <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesFilter.map((role) => (
                  <StyledTableRow key={role.id}>
                    <StyledTableCell component="th" scope="row">
                      {role.id}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {role.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                        <Box display="flex">
                            <Box sx={{ paddingLeft: 10 }}>
                                {storage.get('authUser').permisos.some(permiso => permiso == 'admin.roles.update') ?
                                (<EditRole
                                role={role}
                                setRoles={setRoles}
                                roles={roles}
                                getAllRoles={getAllRoles}
                                enviarMessage={enviarMessage}
                                />):null}
                            </Box>
                            <Box sx={{ paddingLeft: 10 }}>
                                {storage.get('authUser').permisos.some(permiso => permiso == 'admin.roles.destroy') ?
                                    (<DeleteRole
                                        roles={roles}
                                        setRoles={setRoles}
                                        role={role}
                                        getAllRoles={getAllRoles}
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
              <Box sx={styleButtonFloat}>
                  {storage.get('authUser').permisos.some(permiso => permiso == 'admin.roles.create') ?
                      (<CreateRole
                          setRoles={setRoles}
                          roles={roles}
                          enviarMessage={enviarMessage}/>):null}
              </Box>
          </Table>):
                  <Box sx={styleAlarm}>
                      <NotFound/>
                  </Box>}
          </>}
      <ToastContainer/>
    </>
  )
}

export default ListRoles