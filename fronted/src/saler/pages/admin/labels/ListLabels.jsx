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
import {notification_succes} from "../../../../general/notifications/NotificationTostify.jsx";
import {categoryApi, labelsApi} from "../../../../apis/QueryAxios.jsx";
import TravelExploreIcon from "@mui/icons-material/TravelExplore.js";
import '../../../../css/Searching.css'
import NotFound from '../../../../general/NotFound';
import CreateLabels from "./CreateLabels.jsx";
import EditLabels from "./EditLabels.jsx";
import DeleteLabels from "./DeleteLabels.jsx";
import Autocomplete from "@mui/material/Autocomplete";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings.js";
import TextField from "@mui/material/TextField";
import * as React from "react";

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

const styleButtonFloat = {
  paddingTop: 2,
};


function ListLabels() {
    const [categories,setCategories] = useState([])
    const [category_filtered ,setCategory_filtered] = useState(null)
    const [labels,setLabels] = useState([])
    const [labelsFilter,setLabelsFilter] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [usersxPage,setusersxPage] = useState(10)
    const [firstPage,setFirstPage] = useState(0)
    const [lastPage,setLastPage] = useState(usersxPage)
    const [totalPages,setTotalPages] = useState(0)
    const [page,setPage] = useState(1)
    const[search,setSearch] = useState("")

    const enviarMessage = (msg) =>{
        notification_succes(msg)
        setPage(1)
        setSearch('')
    }
  const getAllLabels = async (value) =>{
    try
    {
      setLoading(true)
      const token = storage.get('authToken')
      const response = await labelsApi.get('/',{
        headers: {
          'Authorization': `Bearer ${token}`
        }})
         setLoading(false)
        setLabels(response.data)
        setLabelsFilter(response.data.slice(firstPage,lastPage))
        setTotalPages(Math.ceil(response.data.length/usersxPage))
    }
    catch(e){
      setLoading(false)
      show_alert_danger(e.response.data.msg)
      navigate('/')
    }

  }

    const getAllCategory = async (value) =>{
        try
        {
            const token = storage.get('authToken')
            const response = await categoryApi.get('/',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
            setLoading(false)
            setCategories(response.data)
        }
        catch(e){
            show_alert_danger(e.response.data.msg)
            navigate('/')
        }

    }
    const searcher =  (e) => {
        setPage(1)
        setSearch(e.target.value)
        let change = e.target.value
        update_page(e,'1',change,usersxPage,category_filtered)
    }

    const FilteredtCategory = (event,value) =>{
        if( value) {
            const category_filtered = value.id
            setCategory_filtered(value.id)
            update_page(event,'1',search,usersxPage,category_filtered)
        }
        else {
            setCategory_filtered(null)
            update_page(event,'1',search,usersxPage,null)

        }
    }
    const update_user_xpage = (e) =>
    {
        if(e.target.value != 0 ) {
            setusersxPage(e.target.value)
            const user_x_page = e.target.value
            update_page(e, '1', search, user_x_page, category_filtered)
        }

    }

    const update_page = (event,value,change=search,user_x_page = usersxPage,category=category_filtered) => {
        if(change || category) {
            const name = change
            const category_filter = category
            let labels_filtered = []
            if(category_filter) {
                labels_filtered = labels.filter((dato) =>
                    dato.name.toLowerCase().includes(name.toLocaleLowerCase()) && dato.category.id == category_filter
                )
            }
            else{
                labels_filtered = labels.filter((dato) =>
                    dato.name.toLowerCase().includes(name.toLocaleLowerCase())
                )
            }
            if(labels_filtered){
                const pages_filtered = Math.ceil(labels_filtered.length/user_x_page)
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
                setLabelsFilter(labels_filtered.slice(first, second))

            } else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setLabelsFilter(labels_filtered.slice(first, second))
            }
        }
        else {
            if (value == 1) {
                const first = 0
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setLabelsFilter(labels.slice(first, second))

            } else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setLabelsFilter(labels.slice(first, second))
            }
            setTotalPages(Math.ceil(labels.length/user_x_page))

        }
        setPage(value)
    };


    useEffect (() =>{
        getAllLabels()
        getAllCategory()
  },[])

  return (
    <div>
        <NavBarSaler/>
        <Typography sx={{
            top: '90px',
            position: 'absolute',
            left: '10%',
            width: '80%',}} >
                <div className='contenedor'>
                        <input type='text' placeholder='Buscar Etiqueta' onChange={searcher} value={search} />
                        <TravelExploreIcon className="icon" />
                </div>
        </Typography>
        <Typography sx={{
            top: '90px',
            position: 'absolute',
            right: '50px'}} >
            <div className='filter'>
                <label>Filtrar Por</label>
                <Autocomplete
                    onChange={FilteredtCategory}
                    disablePortal
                    id="disable-close-on-select"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 320,height:10 }}
                    renderInput={(params) =>  <TextField className='form-control bg-light text-dark' {...params} label="Categorias" variant="standard"></TextField>}
                />
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
          <>
          {labelsFilter.length !=0 ?(
          <Table sx={styleContainer}>
            <TableHead>
              <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Categoria</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {labelsFilter.map((label) => (
                  <StyledTableRow key={label.id}>
                    <StyledTableCell component="th" scope="row">
                      {label.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{label.name}</StyledTableCell>
                    <StyledTableCell align="right">{label.category.name}</StyledTableCell>
                    <StyledTableCell  align="right">
                      <Box display="flex">

                      <Box sx={{ paddingLeft: 10 }}>
                        <EditLabels
                            label={label}
                            categories={categories}
                            getAllLabels={getAllLabels}
                            enviarMessage={enviarMessage}
                        />
                      </Box>
                      <Box sx={{ paddingLeft: 10 }}>
                        <DeleteLabels
                            label={label}
                            getAllLabels={getAllLabels}
                            enviarMessage={enviarMessage}/>
                      </Box></Box>

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
              <Typography>Page: {page}</Typography>
              <Pagination variant="outlined" count={totalPages} page={page} onChange={update_page} />
            </Stack>
            <Box sx={styleButtonFloat}>
              <CreateLabels
                  getAllLabels={getAllLabels}
                  categories={categories}
                  enviarMessage={enviarMessage}/>
            </Box>

          </Table>):
          <Box sx={styleAlarm}>
            <NotFound/>
            </Box>}

          </>}
      <ToastContainer/>

    </div>
  )
}

export default ListLabels