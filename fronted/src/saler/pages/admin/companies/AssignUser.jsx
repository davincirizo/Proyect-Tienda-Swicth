import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import NotFound from "../../../../general/NotFound.jsx";
import {useState} from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:600,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px' ,
};
export default function AssignUser (props){
    const {users,usersAssigned,setusersAssigned} = props
    const [open, setOpen] = React.useState(false);
    const [usersFiltered , setUsersFiltered] = useState([])
    const[search,setSearch] = useState("")
    const handleOpen = (e) => {
        setUsersFiltered(users)
        e.preventDefault()
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }
    const checkBoxUsers =  (e) => {
        const {value,checked} = e.target
        const id_sele = parseInt(value)
        if(checked){
            setusersAssigned([...usersAssigned,id_sele])
        }
        else{
            setusersAssigned(usersAssigned.filter(o=> o!=id_sele))
        }

    }
    const searcher =  (e) => {
        setSearch(e.target.value)
        const value = e.target.value
        const users_filtered = users.filter((dato) =>
            dato.name.toLowerCase().includes(value.toLocaleLowerCase())
        )
        setUsersFiltered(users_filtered)
    }

    return(
        <>
            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
                <Button variant="contained" endIcon={<GroupAddIcon/>}>
                    ADD USERS
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={style}>
                    <div className='buscador_px'>
                        <input className='form-control w-50 bg-light text-dark' type='text' placeholder='Search Users' onChange={searcher} value={search} />
                        <TravelExploreIcon className="icon" />
                    </div>
                    {usersFiltered.length != 0 ?
                        (<List
                            sx={{
                                width: '100%',
                                maxWidth: 300,

                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 420,
                                fontWeight: 'bold',
                                left: 10,
                                marginTop: 2,
                                '& ul': { padding: 0 },
                            }}
                            subheader={<li />}
                        >
                            {usersFiltered.map((user) => (
                                    <ul key={user.id}>

                                        <div>

                                            <Checkbox
                                                value={user.id}
                                                onChange={checkBoxUsers}
                                                defaultChecked={usersAssigned.map(r => r).includes(user.id)}
                                            />
                                            {user.name}
                                        </div>
                                    </ul>
                            ))}
                        </List>):
                        <div>
                            <NotFound/>
                        </div>}
                </Box>

            </Modal>

        </>
        )
}