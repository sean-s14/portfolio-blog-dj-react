import { useState, useEffect } from 'react';
import {
    Typography,
    Skeleton,
    Box,
    Grid,
    Button,

    useMediaQuery,
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper'
import { NavLink } from 'react-router-dom';
import { axiosInstance } from 'src/axiosApi';
import { indigo } from '@mui/material/colors';


export default function BlogPage() {

    const laptop = useMediaQuery('(min-width:1200px)');
    const mobile = useMediaQuery('(min-width:600px)');

    const [ articles, setArticles ]: any = useState(null)
    const skeletonArticles = [true, true, true];

    const months= [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]

    useEffect( () => {
        axiosInstance
            .get(`/articles/?page=1&page_size=3`)
            .then( res => {
                // setArticles( res.data.results );
                console.log( res.data );
                setTimeout(() => {
                    setArticles( res.data.results );
                }, 500);
            })
            .catch( err => console.log(err.request) );
    }, [])


    return (
        <PageWrapper
            styling={{
                display: mobile ? 'flex' : 'block',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                sx={{
                    // border: '1px solid black',
                    m: 'auto',
                    px: laptop ? 20 : 0,
                    py: 5
                }}
            >
                <Grid
                    item
                    xs={12}
                    sx={{textAlign: 'center', mb: 2}}
                >
                    <Typography
                        variant='h4'
                    >
                        Recent Posts
                    </Typography>
                </Grid>
                { articles ?
                    articles.map( ({title, slug, image, date_created}, index: number) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            className={'image-fade-in'}
                            sx={{
                                opacity: 0,
                                display: 'flex',
                                alignItems: 'center',
                                // justifyContent: mobile ? (index%2 === 0 ? 'flex-end' : 'flex-start') : 'center',
                                justifyContent: 'center',
                                p: 3
                            }}
                        >
                            <NavLink
                                to={`blog/detail/${slug}/`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <Box
                                    sx={{
                                        minWidth: 200,
                                        width: 200,
                                        maxWidth: 200,
                                        
                                        // minHeight: '10rem',
                                        // height: '10rem',
                                        // maxHeight: '10rem',
                                        
                                        boxShadow: '2px 2px 8px 0px #111',
                                        // p: 1,

                                        position: 'relative',
                                        display: 'flex',
                                    }}
                                >
                                    { image ?
                                        <img
                                            src={image}
                                            alt={title}
                                            style={{
                                                minWidth: '100%',
                                                width: '100%',
                                                maxWidth: '100%',
                                            }}
                                        />
                                    :
                                        <Skeleton variant="rectangular" width={200} height={150} />
                                    }
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
                                                height: '15%',

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
                            </NavLink>
                        </Grid>
                    ))
                :
                    skeletonArticles && skeletonArticles.map( (item, index) => (
                        <Grid
                            key={index} item
                            xs={12} sm={6} md={4}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 3
                            }}
                        >
                            <Skeleton variant="rectangular" width={200} height={150} />
                        </Grid>
                    ))
                }

                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        // border: '1px solid black',
                    }}
                >
                    <NavLink
                        to='blog/all'
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Button
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'fontWeightRegular',
                                color: 'text.primary',
                                bgcolor: 'primary.dark',
                                '&:hover': {
                                    bgcolor: 'primary.main'
                                },
                                width: '10rem'
                            }}
                        >
                            All Posts &gt;&gt;&gt;
                        </Button>
                    </NavLink>
                </Grid>
            </Grid>

        </PageWrapper>
    );
}