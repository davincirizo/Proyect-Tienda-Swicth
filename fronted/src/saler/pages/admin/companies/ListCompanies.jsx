import NavBarSaler from "../../../general/NavBarSale.jsx";
import storage from "../../../../storage/Storage.jsx";
import {companyApi} from "../../../../apis/QueryAxios.jsx";
import {handleResponse} from "../../../../general/HandleResponse.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Typography from "@mui/material/Typography";
import TravelExploreIcon from "@mui/icons-material/TravelExplore.js";
import {PulseLoader} from "react-spinners";
import Box from "@mui/material/Box";
import NotFound from "../../../../general/NotFound.jsx";
import Table from '@mui/material/Table';
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import CreateCompany from "./CreateCompany.jsx";
import {Avatar, Tooltip} from "@mui/material";
import * as React from "react";
import EditCompany from "./EditCompany.jsx";
import DeleteCompany from "./DeleteCompany.jsx";


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

const styleButtonFloat = {
    paddingTop: 2,
};

function ListCompanies(props){
    const {companies,loading,users,setCompanies,getAllCompanies,type_request} = props


    const [companiesFilter,setCompaniesFilter] = useState([])
    const backend = import.meta.env.VITE_BACKEND_URL_native
    const [page,setPage] = useState(1)
    const [companyXPage,setcompanyXPage] = useState(10)
    const [firstPage,setFirstPage] = useState(0)
    const [lastPage,setLastPage] = useState(companyXPage)
    const [totalPages,setTotalPages] = useState(0)
    const[search,setSearch] = useState("")
    const [order,setOrder] = useState('id')
    const [order_direction,setOrder_direction] = useState(true)



    const set_page = async (value) =>{
        setCompaniesFilter(companies.slice(firstPage,lastPage))
        setTotalPages(Math.ceil(companies.length/companyXPage))
    }
    const searcher =  (e) => {
        setPage(1)
        setSearch(e.target.value)
    }

    const onchange_page = (event,value) =>{
        setPage(value)
    }

    const update_user_xpage = (e) => {
        if(e.target.value != 0) {
            setcompanyXPage(e.target.value)
            setPage(1)
        }

    }

    const changeOrderBy = (e) =>{
        setOrder(e.target.value)
        setOrder_direction(!order_direction)
    }

    const order_by = (filtrar,type_order) => {
        const company_order = filtrar.sort((a,b) =>{
            if(a[type_order] < b[type_order]){
                return order_direction === true ? -1 : 1
            }
            if(a[type_order] > b[type_order]){
                return order_direction === true ? 1 : -1
            }
            return 0
        })
        return company_order
    }

    const update_page = (value,change,user_x_page,order_ytpe,) => {
        order_by(companies,order_ytpe)
        if(change) {
            const filter = change
            const companies_filtered = companies.filter((dato) =>
                dato.name.toLowerCase().includes(filter.toLocaleLowerCase())
            )
            if(companies_filtered){
                const pages_filtered = Math.ceil(companies_filtered.length/user_x_page)
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
                setCompaniesFilter(companies_filtered.slice(first, second))

            } else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setCompaniesFilter(companies_filtered.slice(first, second))
            }
        }
        else {
            if (value == 1){
                const first = 0
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setCompaniesFilter(companies.slice(first, second))

            }
            else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setCompaniesFilter(companies.slice(first, second))
            }
            setTotalPages(Math.ceil(companies.length/user_x_page))
        }
    };


    useEffect (() =>{
        set_page()
    },[])


    useEffect (() =>{
        update_page(page,search,companyXPage,order)
    },[search,companyXPage,page,companies,order,order_direction])

    return(
        <>
            <NavBarSaler/>
            <Typography sx={{
                top: '90px',
                position: 'absolute',
                left: '10%',
                width: '80%',}} >
                <div className='contenedor'>
                    <input type='text' placeholder='Buscar Compañia' onChange={searcher} value={search} />
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
                <>
                {companiesFilter.length !=0 ?(
                        <Table sx={styleContainer}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell onClick={() => changeOrderBy({target: {value: 'id'} })}>ID</StyledTableCell>
                                    <StyledTableCell  onClick={() => changeOrderBy({target: {value: 'name'} })} align="left">Nombre</StyledTableCell>
                                    {/*<StyledTableCell onClick={pos}  align="left">Nombre</StyledTableCell>*/}
                                    <StyledTableCell align="left">Image</StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companiesFilter.map((company) => (
                                    <StyledTableRow key={company.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {company.id}
                                        </StyledTableCell>
                                        <Tooltip title={`${company.description  || ''}`}>
                                            <StyledTableCell align="left">{company.name}</StyledTableCell>
                                        </Tooltip>
                                        <StyledTableCell align="left">
                                            <Avatar
                                                alt={company.name}
                                                src={`${backend}/storage/${company.image}`}
                                                sx={{
                                                    minWidth: 70,
                                                    maxWidth: 130,
                                                    minHeight: 50,
                                                    maxHeight: 90,
                                                }}
                                                variant="square"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell  align="right">
                                            <Box display="flex">

                                                <Box sx={{ paddingLeft: 10 }}>
                                                    {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.companies.update' || permission.name  == 'saler.companies.update')) ?
                                                        (<EditCompany
                                                            companies={companies}
                                                            setCompanies={setCompanies}
                                                            users={users}
                                                            company={company}
                                                            type_request={type_request}
                                                        />):null}
                                                </Box>
                                                <Box sx={{ paddingLeft: 10 }}>
                                                    {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.categories.destroy')) ?
                                                        (<DeleteCompany
                                                            company={company}
                                                            companies={companies}
                                                            setCompanies={setCompanies}
                                                            getAllCompanies={getAllCompanies}
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
                                        <input style={{width:'70px'}} className='input-group-text' type='number' value={companyXPage} onChange={update_user_xpage}/>
                                    </div>
                                </Typography>
                                <Typography>Page: {page}</Typography>
                                <Pagination variant="outlined" count={totalPages} page={page} onChange={onchange_page} />
                            </Stack>
                            <Box sx={styleButtonFloat}>
                                {storage.get('authUser') && storage.get('authUser').roles.some(role => role.permissions.some(permission => permission.name  == 'admin.companies.store')) ?
                                    (<CreateCompany
                                        companies={companies}
                                        setCompanies={setCompanies}
                                        users={users}
                                       />):null}
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

export default ListCompanies