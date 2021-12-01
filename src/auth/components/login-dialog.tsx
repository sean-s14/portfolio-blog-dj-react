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

    Theme,
    useTheme
} from '@mui/material';
import LoginForm from 'src/auth/components/login-form';
import { indigo } from '@mui/material/colors';


interface LoginButtonProps {
    btnStyle?: object;
}

export default function LoginDialog({ btnStyle }: LoginButtonProps) {

    const theme: Theme = useTheme()

    const [openDialog, setOpenDialog] = useState(false);

    const [ form, setForm ] = useState(<>Form goes here</>)

    const handleCloseDialog = () => setOpenDialog(false);
    
    const handleOpenDialog = (e) => {
        setForm(<LoginForm closeModal={ handleCloseDialog } />)
        setOpenDialog(true);
    };

    return (
        <>
            <Button
                name='login-dialog-open'
                color="inherit"
                // variant='contained'
                size='small'
                sx={{
                    ...btnStyle
                }}
                onClick={ handleOpenDialog }
            >
                Admin Login
            </Button>

            <Dialog 
                open={ openDialog }
                onClose={ handleCloseDialog }
                sx={{
                    '& > * > *': {
                        borderRadius: '0',
                        minWidth: 250,
                        width: 400,
                        maxWidth: 400
                    }
                }}
            >
                <Box 
                    sx={{
                        border: '8px solid black',
                        borderColor: theme.palette.mode === 'dark' ? 'primary.dark' : indigo[300],
                        bgcolor: 'primary.main',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    { form }
                </Box>
            </Dialog>
        </>
    );
}