import { useState } from 'react';
import {
    Typography,
    FormControl,
    Button,
    Grid,
    Paper,
    Input,

    useTheme,
    Theme,
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import { axiosInstance } from 'src/axiosApi';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";


interface LoginFormProps {
    closeModal: () => void;
}

export default function LoginForm({ closeModal }: LoginFormProps) {

    const [ form, setForm ]: any = useState({});

    const theme: Theme = useTheme();

    let history = useHistory();


    const handleSubmit = (e: any) => {
        console.log(e)
        console.log(form)
        // e.preventDefault()
        
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

    const formFieldStyles = {
        color: theme.palette.mode === 'dark' ? indigo[100] : indigo[800],
        bgcolor: theme.palette.mode === 'dark' ? indigo[800] : indigo[100],
        border: '5px solid black',
        borderColor: theme.palette.mode === 'dark' ? indigo[900] : indigo[300],
        pl: 1,
    }

    return (
        <Grid 
            container
            spacing={3}
            sx={{
                minWidth: '17rem',
                width: '35%',
                '& > * > * > * >::before,  > * > * > * >::after': {
                    border: 'none !important'
                }
            }}
        >
            {/* Username Field*/}
            <Grid item xs={12}>
                <Paper elevation={12}>
                    <FormControl fullWidth>
                            <Input
                                id="login-name"
                                aria-describedby="my-helper-text"
                                type='text'
                                placeholder='username...'
                                autoFocus
                                sx={formFieldStyles}
                                onChange={ e => setForm({...form, username: e.target.value}) }
                            />
                    </FormControl>
                </Paper>
            </Grid>
            
            {/* Password Field */}
            <Grid item xs={12}>
                <Paper elevation={12}>
                    <FormControl fullWidth>
                        <Input
                            id="login-password"
                            aria-describedby="my-helper-text"
                            type='password'
                            placeholder='password...'
                            required
                            sx={formFieldStyles}
                            onChange={ e => setForm({...form, password: e.target.value}) }
                        />
                    </FormControl>
                </Paper>
            </Grid>

            {/* Errors */}
            { form.error && 
                <Grid item xs={12}>
                    <Typography
                        variant="body1" 
                        component="p"
                        sx={{color: 'red'}}
                        // sx={{ mb: 5, width: '100%', textAlign: 'center' }}
                    >
                        { form.error}
                    </Typography>
                </Grid>
            }

            {/* Submit Button */}
            <Grid item xs={12}>
                <Paper elevation={12}>
                    <Button 
                        variant="contained"
                        fullWidth
                        sx={{
                            fontWeight: 'fontWeightRegular',
                            textTransform: 'none',
                            color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.secondary',
                            bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : indigo[300],
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            },
                        }}
                        onClick={ handleSubmit }
                    >
                        Login
                    </Button>
                </Paper>
            </Grid>

        </Grid>
    );
}