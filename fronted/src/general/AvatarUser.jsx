import storage from "../storage/Storage.jsx";
import {Avatar} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle.js";
import * as React from "react";


export default function AvatarUser() {
    const backend = import.meta.env.VITE_BACKEND_URL_native

    return<>
        {storage.get('authUser') && storage.get('authUser').image?
        (   <>
                <Avatar sx={{ width: 28, height: 28 }}
                        alt="Remy Sharp"
                        src={`${backend}/storage/${storage.get('authUser').image}`}

                />
            </>
        )
            :<>
                <AccountCircle />
            </>}
        {storage.get('authUser')?
            (<span style={{ fontSize: "15px" }}>
                {storage.get('authUser').name}
            </span>):null}
    </>

}