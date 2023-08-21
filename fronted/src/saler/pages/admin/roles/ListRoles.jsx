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
import '../../../../css/Searching.css'
import { roleApi } from '../../../../apis/QueryAxios'



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
        setusersxPage(e.target.value)
        const user_x_page = e.target.value
        update_page(e,'1',search,user_x_page)
    
      }
      const update_page = async (event,value,change=search,user_x_page = usersxPage) => {
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
      const searcher = (e) => {
        setPage(1)
        setSearch(e.target.value)
        let change = e.target.value
        update_page(e,'1',change)
      }

      useEffect (() =>{
        getAllRoles()
      },[])


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
                <StyledTableCell align="center">Nombre</StyledTableCell>
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
                  </StyledTableRow>
              ))}
            </TableBody>
            <Stack spacing={2}>
              <Typography>
                <div >
                  <input style={{width:'70px'}} className='input-group-text' type='number' value={usersxPage} onChange={update_user_xpage}/>
                </div>
              </Typography>
              <Pagination variant="outlined" count={totalPages} onChange={update_page} page={page}/>
            </Stack>
          </Table>}
      <ToastContainer/>
    </>
  )
}

export default ListRoles