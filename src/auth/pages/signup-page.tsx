import { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Button,
    // Divider,
    OutlinedInput,
} from '@mui/material';
import { axiosInstance } from 'src/axiosApi';


export default function SignupPage() {

    const [ form, setForm ]: any = useState({})

    function handleSubmit(e: any) {
        e.preventDefault()
        
        axiosInstance.post('/auth/user/create/', {
            username: form.username,
            email: form.email,
            password: form.password
        })
        .then( (res: any) => {
                // axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
                // localStorage.setItem('access_token', res.data.access);
                // localStorage.setItem('refresh_token', res.data.refresh);
                console.log(res);
        })
        .catch( (err: any) => {
                console.log(err);
                setForm({...form, errors: err.response.data});
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
                        Signup
                    </Typography>

                    <FormControl sx={{ mb: 5 }}>
                        <InputLabel shrink htmlFor="signup-username">Username</InputLabel>
                        <OutlinedInput
                            id="signup-username"
                            aria-describedby="my-helper-text"
                            label='Username'
                            notched
                            onChange={ e => setForm({...form, username: e.target.value}) }
                        />
                    </FormControl>
                    {/* { form.errors.username ? form.errors.username : null} */}

                    <FormControl sx={{ mb: 5 }}>
                        <InputLabel shrink htmlFor="signup-email">Email address</InputLabel>
                        <OutlinedInput
                            id="signup-email"
                            aria-describedby="my-helper-text"
                            label='Email address'
                            notched
                            type="email"
                            onChange={ e => setForm({...form, email: e.target.value}) }
                        />
                    </FormControl>
                    {/* { form.errors.email ? form.errors.email : null} */}

                    <FormControl sx={{ mb: 5 }}>
                        <InputLabel shrink htmlFor="signup-password">Password</InputLabel>
                        <OutlinedInput
                            type="password"
                            id="signup-password"
                            aria-describedby="my-helper-text"
                            label='Password'
                            notched
                            onChange={ e => setForm({...form, password: e.target.value}) }
                        />
                    </FormControl>
                    {/* { form.errors.password ? form.errors.password : null} */}

                    <Button 
                        variant="contained" 
                        sx={{ width: '100%' }}
                        type='submit'
                    >
                        Signup
                    </Button>
            </form>
        </Box>
    );
}