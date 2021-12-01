import { useState } from 'react';
import {
    Button,
    Box,
    // Typography,
    Dialog,
    // DialogActions,
    // DialogContent,
    // DialogContentText,
    // DialogTitle,
} from '@mui/material';
import LoginForm from 'src/auth/components/form-login';
import SignupForm from 'src/auth/components/form-signup';

interface LoginSignupDialogProps {
    loginBtnStyle?: object;
    signupBtnStyle?: object;
}

export default function LoginSignupDialog({ loginBtnStyle, signupBtnStyle }: LoginSignupDialogProps) {

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => setOpenDialog(false);

    const [ form, setForm ] = useState(<>Form goes here</>)
    

    const handleOpenDialog = (e) => {
        if (e.target.name === 'login-dialog-open') {
            // handleFormSwitch('signup');
            setForm(<LoginForm switchForm={ handleOpenDialog } closeModal={ handleCloseDialog } />);
        } else if (e.target.name === 'signup-dialog-open') {
            setForm(<SignupForm switchForm={ handleOpenDialog } closeModal={ handleCloseDialog } />);
        };
        setOpenDialog(true);
    };



    return (
        <>

            <Button
                name='login-dialog-open'
                color="inherit"
                variant="outlined"
                // size='small'
                sx={{
                    mr: 2,
                    my: 1,
                    borderRadius: '0',
                    ...loginBtnStyle
                }}
                onClick={handleOpenDialog}
            >
                Login
            </Button>
            
            <Button
                name='signup-dialog-open'
                color="inherit"
                variant="contained"
                sx={{
                    mr: 2,
                    my: 1,
                    borderRadius: '0',
                    color: '#333',
                    bgcolor: '#fff',
                    ...signupBtnStyle
                }}
                onClick={handleOpenDialog}
            >
                Signup
            </Button>

            <Dialog 
                open={openDialog}
                onClose={handleCloseDialog}
                sx={{
                    '& > * > *': {
                        borderRadius: '0',
                        minWidth: 250,
                        width: 500,
                        maxWidth: 500
                    }
                }}
            >
                <Box 
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    { form }
                </Box>
            </Dialog>
        </>
    );
}