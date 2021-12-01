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
import { 
    indigo,
    // blue
} from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from 'src/axiosApi';


interface SubFormProps {
    closeModal: () => void;
}

export default function SubscriptionForm({ closeModal }: SubFormProps) {

    const theme: Theme = useTheme()

    const [ form, setForm ]: any = useState({})

    let history = useHistory();

    const handleSubmit = (e: any) => {
        // console.log(e)
        console.log(form)

        axiosInstance
            .post('/subscribers/', form)
            .then( (res: any) => {
                console.log(res);
                history['alert'] = {
                    open: true,
                    msg: <>
                            <span style={{fontSize: '20px', margin: 1}}>Subscribed! </span>
                            <span style={{fontSize: '16px', margin: 1}}>Check your inbox to verify email</span>
                            {/* <p style={{fontSize: '12px', margin: 1}}>Didn't receive an email? Click <a href='localhost:3000' style={{color: blue[300]}}>here</a> to resend</p> */}
                        </>
                    };
                closeModal();
                history.push('/');
            })
            .catch( (err: any) => {
                // console.log(err);
                // console.log(err.response);
                console.log(err.response.data);
                if (err.request.status === 400) {
                    setForm({...form, error: err.response.data.email});
                };
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
        <>
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
                    {/* Email Field */}
                    <Grid item xs={12}>
                        <Paper elevation={12}>
                            <FormControl fullWidth>
                                <Input
                                    id="subscriber-email"
                                    aria-describedby="my-helper-text"
                                    type='email'
                                    placeholder='email...'
                                    required
                                    sx={formFieldStyles}
                                    onChange={ e => setForm({...form, email: e.target.value}) }
                                />
                            </FormControl>
                        </Paper>
                    </Grid>

                    {/* Errors */}
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

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Paper elevation={12}>
                            <Button 
                                variant="contained"
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : indigo[300],
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
                                    },
                                    color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.secondary',
                                    fontWeight: 'fontWeightRegular',
                                }}
                                onClick={ handleSubmit }
                            >
                                Subscribe
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
        </>
    );
}