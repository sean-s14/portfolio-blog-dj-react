import { useState, useEffect } from 'react';
import {
    Typography,
    Skeleton,
    Grid,
    Box,
    Button,
    // Paper,

    useMediaQuery,
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper'
import { NavLink } from 'react-router-dom';
import { axiosInstance } from 'src/axiosApi';
import { indigo } from '@mui/material/colors';


export default function ProjectsPage() {

    const [ projects, setProjects ]: any = useState(null)
    const skeletonProjects = [1, 1];

    const laptop = useMediaQuery('(min-width:1200px)');

    const months= [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]

    const getArticles = () => {
        axiosInstance
            .get(`/projects/?page=1&page_size=2`)
            .then( res => {
                // setProjects( res.data.results );
                setTimeout(() => {
                    setProjects( res.data.results );
                }, 500);
                console.log( res.data );
            })
            .catch( err => console.log(err.request) );
    };

    useEffect( () => {
        getArticles()
    }, [])


    return (
        <PageWrapper 
            styling={{
                display: laptop ? 'flex' : 'block', 
                alignItems: 'center', 
                justifyContent: 'center',
            }}
        >
            <Grid
                container
                rowSpacing={8}
                columnSpacing={4}
                sx={{p: 3}}
            >

                <Grid
                    item
                    xs={12}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Typography sx={{fontSize: 30}}>
                        My Recent Projects
                    </Typography>
                </Grid>

                { projects ?
                    projects.map( ({title, link, image, description, date_created}, index: number) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            lg={6}
                            className={'image-fade-in'}
                            sx={{
                                opacity: 0,
                                display: 'flex',
                                justifyContent: laptop ? (index === 0 ? 'flex-end' : 'flex-start') : 'center',
                                alignItems: 'center',
                                // border: '1px solid black'
                            }}
                        >
                        <Box
                            sx={{
                                minWidth: 350,
                                width: 350,
                                maxWidth: 350,
                                boxShadow: '2px 2px 8px 0px #111',
                                position: 'relative',
                                display: 'flex',
                            }}
                        >
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
                                    color: `${indigo[50]} !important`
                                }}
                            >
                                <Typography
                                    variant='caption'
                                    sx={{
                                        height: '15%'
                                    }}
                                >
                                    {`${new Date(date_created).getDate()} ${months[new Date(date_created).getMonth()]} ${new Date(date_created).getFullYear()}`}
                                </Typography>

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
                        </Grid>
                    ))
                :
                    skeletonProjects && skeletonProjects.map( (item, index) => (
                        <Grid
                            key={index} item
                            xs={12} lg={6}
                            sx={{
                                display: 'flex',
                                justifyContent: laptop ? (index === 0 ? 'flex-end' : 'flex-start') : 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton variant="rectangular" width={350} height={250} />
                        </Grid>
                    ))
                }

                <Grid
                    item
                    xs={12}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <NavLink
                        to={'projects/all'}
                        style={{textDecoration: 'none'}}
                    >
                        <Button
                            variant='contained'
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'fontWeightRegular',
                                color: 'text.primary',
                                bgcolor: 'primary.dark',
                                '&:hover': {
                                    bgcolor: 'primary.main'
                                }
                            }}
                        >
                            All Projects &gt;
                        </Button>
                    </NavLink>
                </Grid>
            </Grid>
        </PageWrapper>
    );
}