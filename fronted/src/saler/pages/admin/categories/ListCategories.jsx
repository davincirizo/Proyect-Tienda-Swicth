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
import CreateCategory from "./CraeteCategory.jsx";
import {PulseLoader} from "react-spinners";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import EditCategory from "./EditCategory.jsx";
import {ToastContainer} from "react-toastify";
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import DeleteCategory from "./DeleteCategory.jsx";


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
  top: '90px',
  left: '10%',
  width: '80%',
  borderRadius: '8px'
};

const styleButtonFloat = {
  paddingTop: 2,
};


function ListCategories() {
    const url = import.meta.env.VITE_BACKEND_URL
    const [categories,setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)

    const enviarMessage = (msg) =>{
      notification_succes(msg)
      setPage(1)
    }
  const getAllCategory = async (value) =>{
    try
    {
      setLoading(true)
      const token = storage.get('authToken')
      const response = await axios.get(`${url}/admin/categories?page=${value}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setLoading(false)
      setCategories(response.data.categories.data)
      setTotalPages(response.data.pages)
    }
    catch(e){
      setLoading(false)
      show_alert_danger(e.response.data.msg)
      navigate('/')
    }

  }
  const handleChange = (event, value) => {
    setPage(value);
    getAllCategory(value)
  };

    useEffect (() =>{
      getAllCategory()
  },[])

  // const imgUrl = 'https://blog.hubspot.es/hs-fs/hubfs/Ejemplo%20de%20fondo%20de%20pa%CC%81gina%20web%20con%20gra%CC%81ficos%20en%20Monys.jpg?width=590&name=Ejemplo%20de%20fondo%20de%20pa%CC%81gina%20web%20con%20gra%CC%81ficos%20en%20Monys.jpg'
  // style={{ backgroundImage: `url(${imgUrl})`}}
  return (
    <div>
        <NavBarSaler/>
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
                <StyledTableCell align="right">Nombre</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                  <StyledTableRow key={category.id}>
                    <StyledTableCell component="th" scope="row">
                      {category.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{category.name}</StyledTableCell>
                    <StyledTableCell  align="right">
                      <Box display="flex">

                      <Box sx={{ paddingLeft: 10 }}>
                        <EditCategory
                            category={category}
                            getAllCategory={getAllCategory}
                            enviarMessage={enviarMessage}
                        />
                      </Box>
                      <Box sx={{ paddingLeft: 10 }}>
                        <DeleteCategory
                            category={category}
                            getAllCategory={getAllCategory}
                            enviarMessage={enviarMessage}/>
                      </Box></Box>

                    </StyledTableCell>

                  </StyledTableRow>
              ))}
            </TableBody>
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination variant="outlined" count={totalPages} page={page} onChange={handleChange} />
            </Stack>
            <Box sx={styleButtonFloat}>
              <CreateCategory
                  getAllCategory={getAllCategory}
                  enviarMessage={enviarMessage}/>
            </Box>

          </Table>}
      <ToastContainer/>

    </div>
  )
}

export default ListCategories