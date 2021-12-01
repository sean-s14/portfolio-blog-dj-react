import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Skeleton,

    useMediaQuery,
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper';
import Masonry from '@mui/lab/Masonry';
import { NavLink } from 'react-router-dom';
import { axiosInstance } from 'src/axiosApi';
import { Edit } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { IsAuthenticated } from 'src/auth/is-authenticated';
import { DeleteProjectConfirmation } from 'src/components/all-components';


export default function ProjectsListPage() {

    const [ projects, setProjects ]: any = useState(null)
    const skeletonProjects = [250, 300, 270, 350, 240, 260];

    const custom2 = useMediaQuery('(min-width:1400px)');
    const custom3 = useMediaQuery('(min-width:1000px)');

    const months= [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]

    const getProjects = () => {
        axiosInstance
            .get(`/projects/?page=1`)
            .then( res => {
                setProjects( res.data.results );
                // setTimeout(() => {
                //     setProjects( res.data.results );
                // }, 500);
                console.log( res.data );
            })
            .catch( err => console.log(err.request) );
    };

    useEffect( () => {
        getProjects()
    }, [])


    return (
        <PageWrapper 
            styling={{
                display: 'flex',
                justifyContent: 'center',
            }}
        
        >
            <Box
                sx={{
                    mt: 15,
                }}
            >
                <Masonry
                    spacing={4}
                    sx={{
                        width: custom2 ? 1150 : (custom3 ? 750 : 400),
                        m: 0,
                    }}
                >
                    {projects ?
                        projects.map(({title, slug, link, image, description, date_created}, index) => (
                            <Box
                                key={index} 
                                className={'image-fade-in'}
                                sx={{
                                    opacity: 0,
                                    minWidth: 350,
                                    width: 350,
                                    maxWidth: 350,
                                    position: 'relative',
                                    display: 'flex',
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
                                                to={`detail/edit/${slug}/`}
                                                style={{
                                                    color: green[300],
                                                    // bgcolor: green[400]
                                                }}
                                            >
                                                <Edit />
                                            </NavLink>
                                        </Box>
                                        {/* Delete Icon */}
                                        <DeleteProjectConfirmation
                                            slug={ slug }
                                            refresh={ getProjects }
                                        />
                                    </>
                                :
                                    <></>
                                }
                                <img
                                    src={image}
                                    alt={title}
                                    style={{
                                        minWidth: '100%',
                                        width: '100%',
                                        maxWidth: '100%',
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: '100%',
                                        maxHeight: '100%',
                                        bgcolor: 'rgba(0,0,0,0.65)',
                                        boxSizing: 'border-box',
                                        p: 1,
                                    }}
                                >

                                    {/* Date */}
                                    <Typography
                                        variant='caption'
                                        sx={{
                                            height: '15%'
                                        }}
                                    >
                                        {`${new Date(date_created).getDate()} ${months[new Date(date_created).getMonth()]} ${new Date(date_created).getFullYear()}`}
                                    </Typography>

                                    {/* Title */}
                                    <Typography
                                        sx={{
                                            width: '100%',
                                            height: '85%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                
                                </Box>
                            </Box>
                        ))
                    :
                        skeletonProjects && skeletonProjects.map( (height, index) => (
                            <Box 
                                key={index} 
                                sx={{
                                    minWidth: 350,
                                    width: 350,
                                    maxWidth: 350
                                }}>
                                <Skeleton variant="rectangular" width={350} height={height} />
                            </Box>
                        ))
                    }

                </Masonry>
            </Box>
        </PageWrapper>
    );
}