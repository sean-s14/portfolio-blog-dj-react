import {
    Button,
    Grid,
    Typography,
    FormControl,
    OutlinedInput,
    Dialog,
    // Box
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import PageWrapper from 'src/layout/page-wrapper';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { axiosInstance } from 'src/axiosApi';



export default function ProfilePage() {

    const [ data, setData ]: any = useState({});  // Data from access_token
    const [ editable, setEditable ] = useState(false);  // If true: displays form
    const [ editedData, setEditedData ]: any = useState(JSON.parse(JSON.stringify(data)));

    const [ openDialog, setOpenDialog ] = useState(false);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleOpenDialog = () => setOpenDialog(true);

    useEffect( () => {
        updateProfileData()
    }, [])

    const updateProfileData = () => {
        let token: any = localStorage.getItem('access_token')
        let decoded: any = jwt_decode(token)
        // setData(decoded)
        // setEditedData({username: decoded.username, email: decoded.email})
        axiosInstance
            .get(`/auth/users/${decoded.user_id}/`)
            .then( res => {
                // console.log(res.data);
                setData(res.data)
                setEditedData(res.data)
            })
            .catch( err => console.log(err) );
    };

    const handleEditForm = () => setEditable(!editable);

    const handleSubmitEdit = () => {
        let token: any = localStorage.getItem('access_token')
        let decoded: any = jwt_decode(token)
        axiosInstance
            .put(`/auth/users/${decoded.user_id}/`,  {
                username: editedData.username,
                email: editedData.email,
                todos: editedData.todos,
                password: editedData.password
            })
            .then( res => {
                // console.log('Successfully sent put request, here is the result: ')
                // console.log(res);
                // console.log(res.request)
                // console.log(res.data)
                handleEditForm();
                handleCloseDialog();
            })
            .then( res => {
                axiosInstance
                    .post('/auth/token/obtain/', {
                        username: editedData.username,
                        password: editedData.password
                    })
                    .then( (res: any) => {
                            axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
                            localStorage.setItem('access_token', res.data.access);
                            localStorage.setItem('refresh_token', res.data.refresh);
                    })
                    .then(res => {
                        updateProfileData()
                    })
                    .catch( (err: any) => {
                            console.log(err);
                    })
            })
            .catch(err => {
                console.log('Error:')
                console.log(err);
                if (err.request.status === 400) {
                    if ( 'email' in JSON.parse(err.request.response) ) {
                        handleCloseDialog();
                    }
                    setEditedData({
                        ...editedData, 
                        errors: { email: '', username: '', ...JSON.parse(err.request.response),}
                    })
                }
            })
            .then( err => {
                // console.log( editedData )
            })
    }

    return (
        <PageWrapper>
            <Grid
                container
                spacing={2}
                sx={{
                    mt: 4,
                }}
            >
                <Grid item xs={10} sx={{textAlign: 'center'}}>
                    <Typography>Profile Page</Typography>
                </Grid>
                <Grid item xs={2} sx={{textAlign: 'right'}}>
                    <Button 
                        variant='contained'
                        sx={{
                            minWidth: '2.5rem',
                            maxWidth: '2.5rem',
                            height: '2.5rem',
                            p:1,
                        }}
                        onClick={ handleEditForm }
                    >
                        <Edit sx={{width: '100%', height: '100%'}}/>
                    </Button>
                </Grid>

                { editable ?
                    <>
                        <Grid 
                            item xs={2}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'right'
                            }}
                        >
                            Username:
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl>
                                <OutlinedInput
                                    type="text"
                                    onChange={ e => setEditedData({...editedData, username: e.target.value}) }
                                    value={editedData.username ? editedData.username : ''}
                                    sx={{
                                        height: '2rem',
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                            <Typography sx={{color: 'red'}}>
                                { editedData.errors ? editedData.errors.username : null }
                            </Typography>
                        </Grid>

                        <Grid 
                            item xs={2}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'right'
                            }}
                        >
                            Email:
                        </Grid>
                        <Grid item xs={10}>
                            <FormControl>
                                <OutlinedInput
                                    type="email"
                                    onChange={ e => setEditedData({...editedData, email: e.target.value}) }
                                    value={editedData.email ? editedData.email : ''}
                                    sx={{
                                        height: '2rem',
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                            <Typography sx={{color: 'red'}}>
                                { editedData.errors ? editedData.errors.email : null }
                            </Typography>
                        </Grid>

                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                            <Button
                                variant='contained'
                                onClick={ handleOpenDialog }
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </>
                :
                    <>
                        <Grid item xs={2} sx={{textAlign: 'right'}}>
                            Username:
                        </Grid>
                        <Grid item xs={10}>
                            {data.username ? data.username : null}
                        </Grid>
                        <Grid item xs={2} sx={{textAlign: 'right'}}>
                            Email:
                        </Grid>
                        <Grid item xs={10}>
                            {data.email ? data.email : null}
                        </Grid>
                    </>
                }
                <Dialog 
                open={openDialog}
                onClose={handleCloseDialog}
                sx={{
                    '& > * > *': {
                        borderRadius: '.5rem',
                        minWidth: 250,
                        width: 300,
                        maxWidth: 300
                    }
                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Grid item xs={12}>
                        <Typography>Please confirm your changes by entering your password below:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{width: '100%'}}>
                            <OutlinedInput
                                type="password"
                                onChange={ e => setEditedData({...editedData, password: e.target.value}) }
                                value={editedData.password ? editedData.password : ''}
                                sx={{
                                    height: '2rem',
                                    width: '100%'
                                }}
                                placeholder='Password'
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{color: 'red'}}>{ editedData.errors ? editedData.errors.password : null }</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={ handleSubmitEdit }
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
            </Grid>
        </PageWrapper>
    );
}