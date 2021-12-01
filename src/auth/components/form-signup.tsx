import {
    Box,
    Button,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Divider,
    Grid
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'src/axiosApi';
import { useState } from 'react';

interface SignupFormProps {
    switchForm?: (e: any) => void;
    closeModal: () => void;
}

export default function SignupForm({ switchForm, closeModal }: SignupFormProps) {

    const [ form, setForm ]: any = useState({errors: {}})

    let history = useHistory();

    const handleSubmit = (e: any) => {
        
        axiosInstance
            .post('/auth/user/create/', {
                username: form.username,
                email: form.email,
                password: form.password
            })
            .then( (res: any) => {
                console.log(res);
                history['alert'] = {open: true, msg: `Account Succesfully Created!`};
                closeModal();
                history.push('/');
            })
            .catch( (err: any) => {
                console.log(err);
                console.log(err.response.data)
                if (err.request.status === 400) {
                    setForm({...form, errors: err.response.data});
                }
            })
    }

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '1rem',
            }}
        >
            <Typography 
                id="transition-modal-title" 
                variant="h4" 
                component="h4"
                sx={{ mb: 3, width: '100%', textAlign: 'center' }}
            >
                Signup
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
                            { form.errors.username && form.errors.username }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel shrink htmlFor="signup-username">Username</InputLabel>
                            <OutlinedInput
                                id="signup-username"
                                aria-describedby="my-helper-text"
                                label='Username'
                                notched
                                onChange={ e => setForm({...form, username: e.target.value}) }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant="body1" 
                            component="p"
                            sx={{color: 'red'}}
                            // sx={{ mb: 5, width: '100%', textAlign: 'center' }}
                        >
                            { form.errors.email && form.errors.email }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required fullWidth>
                            <InputLabel shrink htmlFor="signup-email">Email address</InputLabel>
                            <OutlinedInput
                                id="signup-email"
                                aria-describedby="my-helper-text"
                                label='Email address *'
                                notched
                                onChange={ e => setForm({...form, email: e.target.value}) }
                            />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl required fullWidth>
                            <InputLabel shrink htmlFor="signup-password">Password</InputLabel>
                            <OutlinedInput
                                type='password'
                                id="signup-password"
                                aria-describedby="my-helper-text"
                                label='Password *'
                                notched
                                onChange={ e => setForm({...form, password: e.target.value}) }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl required fullWidth>
                            <InputLabel shrink htmlFor="signup-password-confirm">Confirm Password</InputLabel>
                            <OutlinedInput
                                type='password'
                                id="signup-password-confirm"
                                aria-describedby="my-helper-text"
                                label='Confirm Password *'
                                notched
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            variant="contained"
                            fullWidth
                            type='submit'
                        >
                            Signup
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Divider 
                sx={{
                    mt: '1.5rem',
                    mb: '1.5rem',
                    width: '100%',
                    height: '.05rem',
                    border: 'none',
                    backgroundColor: grey[400]
                }}
            />

            <Box 
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    '& > *': {
                        color: 'text.primary',
                    }
                }}
            >
                <Button
                    name='login-dialog-open'
                    onClick={ switchForm }
                    sx={{
                        alignSelf: 'start'
                    }}
                >
                    Already have an account?
                </Button>
            </Box>
        </Box>
    );
}