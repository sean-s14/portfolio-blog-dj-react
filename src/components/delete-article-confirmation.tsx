import { useState } from 'react';
import {
    Button,
    Box,
    Grid,
    Typography,
    Dialog,
    // DialogActions,
    // DialogContent,
    // DialogContentText,
    // DialogTitle,
    // FormControl,

    Theme,
    useTheme
} from '@mui/material';
import { indigo, red, green } from '@mui/material/colors';
import { Delete } from '@mui/icons-material';
import { axiosInstance } from 'src/axiosApi';
import { useHistory } from "react-router-dom";


interface ButtonProps {
    btnStyle?: object;
    slug: string;
    refresh?: any;
}

export default function DeleteArticleConfirmation({ btnStyle, slug, refresh }: ButtonProps) {

    const theme: Theme = useTheme()

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => setOpenDialog(false);
    
    const handleOpenDialog = (e) => {
        setOpenDialog(true);
    };

    let history = useHistory();
    
    const deleteArticle = (e) => {
        console.log(e.target.dataset.slug);
        axiosInstance
            .delete(`/articles/${e.target.dataset.slug}`)
            .then( res => {
                handleCloseDialog();
                console.log( res.data );
                refresh && refresh();
                history.push('/blog/all');
            })
            .catch( err => console.log(err.request) )
    };

    const buttonStyles: {} = {
        ml: 'auto',
        mr: 'auto',
        width: 120,
        height: 40,
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color .4s',
        border: '5px solid #333',
        borderColor: 'primary.dark',
    }

    return (
        <>
            {/* <Button
                name='subscribe-dialog-open'
                color="inherit"
                // variant='contained'
                size='small'
                sx={{
                    ...btnStyle
                }}
                onClick={ handleOpenDialog }
            >
                Delete
            </Button> */}

            <Button
                data-slug={slug}
                onClick={ handleOpenDialog }
                sx={{
                    minWidth: 38,
                    maxWidth: 38,
                    minHeight: 38,
                    maxHeight: 38,
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    zIndex: 9,
                    borderRadius: 1,
                    p: 0.3,
                    '&:hover': {
                        bgcolor: 'rgb(255,205,210,0.5)'
                    },
                    cursor: 'pointer'
                }}
            >
                <Delete sx={{ color: red[300], pointerEvents: 'none' }} />
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
                        bgcolor: 'primary.main',
                        border: '8px solid black',
                        borderColor: theme.palette.mode === 'dark' ? 'primary.dark' : indigo[300],
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid
                        container
                        rowSpacing={3}
                        sx={{
                            // display: 'flex',
                        }}
                    >
                        <Grid item xs={12}>
                            <Typography sx={{ textAlign: 'center' }}>
                                Are you sure you want to delete this article?
                            </Typography>
                        </Grid>

                        <Grid item xs={6} >
                            <Box
                                sx={{
                                    ...buttonStyles,
                                    bgcolor: red[400],
                                    '&:hover': {
                                        bgcolor: red[700]
                                    },
                                }}
                                onClick={ handleCloseDialog }
                            >
                                <Typography>
                                    No
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    ...buttonStyles,
                                    bgcolor: green[400],
                                    '&:hover': {
                                        bgcolor: green[700]
                                    },
                                }}
                                data-slug={slug}
                                onClick={ deleteArticle }
                            >
                                <Typography sx={{ pointerEvents: 'none'}}>
                                    Yes
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Dialog>
        </>
    );
}