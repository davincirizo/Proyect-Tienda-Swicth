import {useState, useEffect} from 'react'
import NavBarSaler from '../../../general/NavBarSale'
import storage from '../../../../storage/Storage'
import { useNavigate } from 'react-router-dom'
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
import {categoryApi} from "../../../../apis/QueryAxios.jsx";
import TravelExploreIcon from "@mui/icons-material/TravelExplore.js";
import '../../../../css/Searching.css'
import NotFound from '../../../../general/NotFound';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {handleResponse} from "../../../../general/HandleResponse.jsx";


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


function ListCategories() {
    const [categories,setCategories] = useState([])
    const [categoriesFilter,setCategoriesFilter] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [usersxPage,setusersxPage] = useState(10)
    const [firstPage,setFirstPage] = useState(0)
    const [lastPage,setLastPage] = useState(usersxPage)
    const [totalPages,setTotalPages] = useState(0)
    const [page,setPage] = useState(1)
    const[search,setSearch] = useState("")
    const [order,setOrder] = useState('id')

    const enviarMessage = (msg) =>{
        notification_succes(msg)
        setPage(1)
        setSearch('')
    }
  const getAllCategory = async (value) =>{
    try
    {
      setLoading(true)
      const token = storage.get('authToken')
      const response = await categoryApi.get('/',{
        headers: {
          'Authorization': `Bearer ${token}`
        }})
        setLoading(false)
        setCategories(response.data)
        setCategoriesFilter(response.data.slice(firstPage,lastPage))
        setTotalPages(Math.ceil(response.data.length/usersxPage))
    }
    catch(e){
        setLoading(false)
        handleResponse(e,navigate)
    }

  }
    const searcher =  (e) => {
        setPage(1)
        setSearch(e.target.value)
    }
    const onchange_page = (event,value) =>{
        setPage(value)
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

    const update_page = (value,change,user_x_page,order_ytpe) => {
        order_by(categories,order_ytpe)
        if(change) {
          const filter = change
          const categories_filtered = categories.filter((dato) =>
              dato.name.toLowerCase().includes(filter.toLocaleLowerCase())
          )
          if(categories_filtered){
              const pages_filtered = Math.ceil(categories_filtered.length/user_x_page)
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
              setCategoriesFilter(categories_filtered.slice(first, second))

          } else {
              const first = (value - 1) * user_x_page
              const second = value * user_x_page
              setFirstPage(first)
              setLastPage(second)
              setCategoriesFilter(categories_filtered.slice(first, second))
          }
      }
      else {
          if (value == 1){
              const first = 0
              const second = value * user_x_page
              setFirstPage(first)
              setLastPage(second)
              setCategoriesFilter(categories.slice(first, second))

          }
          else {
              const first = (value - 1) * user_x_page
              const second = value * user_x_page
              setFirstPage(first)
              setLastPage(second)
              setCategoriesFilter(categories.slice(first, second))
          }
          setTotalPages(Math.ceil(categories.length/user_x_page))
      }
  };

    const order_by = (filtrar,type_order) => {
        const category_order = filtrar.sort((a,b) =>{
            if(a[type_order] < b[type_order]){
                return -1
            }
            if(a[type_order] > b[type_order]){
                return 1
            }
            return 0
        })
        return category_order
    }

    useEffect (() =>{
      getAllCategory()
  },[])


    useEffect (() =>{
        update_page(page,search,usersxPage,order)
  },[search,usersxPage,page,categories,order])



  return (
    <div>
        <NavBarSaler/>
        <Typography sx={{
            top: '90px',
            position: 'absolute',
            left: '10%',
            width: '80%',}} >
            <div className='contenedor'>
                <input type='text' placeholder='Buscar Categoria' onChange={searcher} value={search} />
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
          {categoriesFilter.length !=0 ?(
          <Table sx={styleContainer}>
            <TableHead>
              <TableRow>

                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Nombre</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesFilter.map((category) => (
                  <StyledTableRow key={category.id}>
                    <StyledTableCell component="th" scope="row">
                      {category.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{category.name}</StyledTableCell>
                    <StyledTableCell  align="right">
                      <Box display="flex">

                      <Box sx={{ paddingLeft: 10 }}>
                          {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.categories.update')) ?
                          (<EditCategory
                            category={category}
                            enviarMessage={enviarMessage}
                            setCategories={setCategories}
                            categories={categories}
                            getAllCategory={getAllCategory}
                        />):null}
                      </Box>
                      <Box sx={{ paddingLeft: 10 }}>
                          {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.categories.destroy')) ?
                        (<DeleteCategory
                            category={category}
                            getAllCategory={getAllCategory}
                            enviarMessage={enviarMessage}
                            setCategories={setCategories}
                            categories={categories}
                        />):null}
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
              <Pagination variant="outlined" count={totalPages} page={page} onChange={onchange_page} />
            </Stack>
            <Box sx={styleButtonFloat}>
                {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.categories.store')) ?
              (<CreateCategory
                  categories={categories}
                  setCategories={setCategories}
                  enviarMessage={enviarMessage}/>):null}
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

export default ListCategories