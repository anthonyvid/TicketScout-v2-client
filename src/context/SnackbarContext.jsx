import React, { createContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbar = (message, severity = 'success') => {
        setOpen(true);
        setMessage(message);
        setSeverity(severity);
    };

    return (
        <SnackbarContext.Provider value={{ handleSnackbar }}>
            {children}
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
                message={message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
