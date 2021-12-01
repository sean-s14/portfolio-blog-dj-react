import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Button,
    Divider,
    OutlinedInput,
    Grid
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'src/axiosApi';
import { useState } from 'react';
import jwt_decode from "jwt-decode";

interface LoginFormProps {
    switchForm?: (e: any) => void;
    closeModal: () => void;
}

export default function LoginForm({ switchForm, closeModal }: LoginFormProps) {

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
        .then( res => {
            let token: any = localStorage.getItem('access_token')
            let decoded: any = jwt_decode(token)
            return decoded
        })
        .then( res => {
            return axiosInstance.get(`auth/users/${res.user_id}`)
        })
        .then(res => {
            history['alert'] = {open: true, msg: `Welcome ${res.data.username}`};
        })
        .then( (res: any) => {
            closeModal();
            history.push('/')  // Sends user to '/' (home page)
        })
        .catch( (err: any) => {
            // console.log(err);
            console.log(err.request);
            if (err.request.status === 401) {
                setForm({...form, error: 'Username/Email and Password did not match!'})
            }
        })
    }


    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '1rem'
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

            <form onSubmit={ handleSubmit } >
                <Grid 
                    container
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Typography
                            variant="body1" 
                            component="p"
                            sx={{color: 'red'}}
                            // sx={{ mb: 5, width: '100%', textAlign: 'center' }}
                        >
                            { form.error && form.error }
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel shrink htmlFor="login-username">Email address / Username</InputLabel>
                            <OutlinedInput
                                id="login-username"
                                aria-describedby="my-helper-text"
                                label='Email address / Username'
                                notched
                                onChange={ e => setForm({...form, username: e.target.value}) }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
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
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            variant="contained"
                            fullWidth
                            type='submit'
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Divider
                sx={{
                    mt: '1.5rem',
                    mb: '1rem',
                    height: '.05rem',
                    width: '100%',
                    border: 'none',
                    backgroundColor: grey[400],
                }}
            />

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    rowGap: 2,
                    '& > *': {
                        // mt: '.5rem !important',
                        color: 'text.primary'
                    }
                }}
            >
                <Button name='signup-dialog-open' onClick={ switchForm }>
                        Create new account
                </Button>

                <Button name='signup-dialog-open' onClick={ switchForm }>
                    Forgot Password?
                </Button>
            </Box>
        </Box>
    );
}