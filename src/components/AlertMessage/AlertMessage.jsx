import { Alert, Snackbar } from "@mui/material";
import React from 'react'
import { useSelector } from "react-redux";

export default function AlertMessage() {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

    };

    const errorMessage = useSelector(state => state.userReducer.error);
    console.log(errorMessage);

    return (

        <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>

    )
}



