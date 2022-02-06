import React from 'react';
import MuiAlert from '@mui/material/Alert';

export const clearLocalStorageDate = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userJoinDate");
    localStorage.removeItem("token");
    localStorage.removeItem("keyboardCat");
}

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});