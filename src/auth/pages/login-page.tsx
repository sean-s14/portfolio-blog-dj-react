import { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Button,
    OutlinedInput,
} from '@mui/material';
import { axiosInstance } from 'src/axiosApi';
import { useHistory } from 'react-router-dom';


export default function LoginPage() {

    const [ form, setForm ]: any = useState({})

    let history = useHistory();

    function handleSubmit(e: any) {
        e.preventDefault()
        
        axiosInstance.post('/auth/token/obtain/', {
            username: form.username,
            password: form.password
        })
        .then( (res: any) => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
        })
        .then( (res: any) => {
            history.push('/')  // Sends user to '/' (home page)
        })
        .catch( (err: any) => {
                throw err;
        })
    }

    return (
        <Box>
            <form 
                onSubmit={ handleSubmit } 
                style={{
                    width: '25rem',
                    // border: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                    <Typography 
                        id="transition-modal-title" 
                        variant="h4" 
                        component="h4"
                        sx={{ mb: 5, width: '100%', textAlign: 'center' }}
                    >
                        Login
                    </Typography>

                    <FormControl sx={{ mb: 5 }}>
                        <InputLabel shrink htmlFor="login-username">Email address / Username</InputLabel>
                        <OutlinedInput
                            id="login-username"
                            aria-describedby="my-helper-text"
                            label='Email address / Username'
                            notched
                            onChange={ e => setForm({...form, username: e.target.value}) }
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 5 }}>
                        <InputLabel shrink htmlFor="login-password">Password</InputLabel>
                        <OutlinedInput
                            type="password"
                            id="login-password"
                            aria-describedby="my-helper-text"
                            label='Password'
                            notched
                            onChange={ e => setForm({...form, password: e.target.value}) }
                        />
                    </FormControl>

                    <Button
                        variant="contained" 
                        sx={{ width: '100%' }}
                        type='submit'
                    >
                        Login
                    </Button>
            </form>
        </Box>
    );
}