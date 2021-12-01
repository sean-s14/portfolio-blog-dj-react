import { useState, useEffect } from 'react';
import {
    Typography,
    // Skeleton,
    Box,
    Paper,

    useMediaQuery
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper'
import { useParams } from "react-router-dom";
import { axiosInstance } from 'src/axiosApi';
import { NavLink } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { IsAuthenticated } from 'src/auth/is-authenticated';


export default function ProjectDetailPage() {

    const [ project, setProject]: any = useState();

    const { slug }: {slug: string} = useParams();

    useEffect( () => {
        axiosInstance
            .get(`/projects/${slug}`)
            .then( res => {
                setProject( res.data );
                console.log( res.data );
            })
            .catch( err => console.log(err.request) );
    }, [slug])

    const laptop = useMediaQuery('(min-width:1200px)')
    const tablet = useMediaQuery('(min-width:900px)')

    const months= [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]

    return (
        <PageWrapper
            styling={{
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    bgcolor: 'primary.dark',
                    minWidth: '18rem',
                    maxWidth: '40rem',
                    // m: 3,
                    mt: 15,
                    mx: laptop ? 'auto' : (tablet ? 10 : 3),
                    position: 'relative',
                }}
            >
                { IsAuthenticated() ?
                    <>
                        {/* Edit Icon */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 45,
                                zIndex: 9,
                                borderRadius: 1,
                                p: 0.3,
                                '&:hover': {
                                    bgcolor: 'rgb(200,230,201,0.5)'
                                }
                            }}
                        >
                            <NavLink
                                to={`/projects/detail/edit/${slug}/`}
                                style={{
                                    color: green[300],
                                    // bgcolor: green[400]
                                }}
                            >
                                <Edit />
                            </NavLink>
                        </Box>
                        {/* Delete Icon */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                zIndex: 9,
                                borderRadius: 1,
                                p: 0.3,
                                '&:hover': {
                                    bgcolor: 'rgb(255,205,210,0.5)'
                                }
                            }}
                        >
                            <NavLink
                                // to={`/detail/delete/${slug}/`}
                                to={''}
                                style={{
                                    color: red[300],
                                    // bgcolor: green[400]
                                }}
                            >
                                <Delete />
                            </NavLink>
                        </Box>
                    </>
                :
                    <></>
                }
                <Box
                    sx={{
                        p: 2
                    }}
                >
                    <Typography
                        variant='caption'
                    >
                        {project && (`${new Date(project.date_created).getDate()} ${months[new Date(project.date_created).getMonth()]} ${new Date(project.date_created).getFullYear()}`)}
                    </Typography>

                    <Typography
                        variant='h5'
                        sx={{
                            mt: 1
                        }}
                    >
                        {project && project.title}
                    </Typography>

                    <Typography
                        variant='body2'
                        sx={{
                            mt: 5
                        }}
                    >
                        {project && project.description}
                    </Typography>

                </Box>
            </Paper>
        </PageWrapper>
    );
}