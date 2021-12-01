import { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    // Grid,
    Skeleton,
    // Button,

    useMediaQuery,
} from '@mui/material';
import { IsAuthenticated } from 'src/auth/is-authenticated';
import PageWrapper from 'src/layout/page-wrapper';
import { DeleteArticleConfirmation } from 'src/components/all-components';
import { axiosInstance } from 'src/axiosApi';
import { NavLink } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry';
import { Edit } from '@mui/icons-material';
import { green } from '@mui/material/colors';


export default function BlogListPage() {

    const laptop = useMediaQuery('(min-width:1200px)');
    const tablet = useMediaQuery('(min-width:900px)');
    const mobile = useMediaQuery('(min-width:600px)');

    
    const [ articles, setArticles ]: any = useState(null)
    const skeletonArticles = [200, 250, 220, 300, 190, 210];

    const months= [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]

    const getArticles = () => {
        axiosInstance
            .get(`/articles/?page=1`)
            .then( res => {
                console.log( res.data );
                setTimeout(() => {
                    setArticles( res.data.results );
                }, 500);
            })
            .catch( err => console.log(err.request) );
    };

    useEffect( () => {
        getArticles()
    }, []);


    return (
        <PageWrapper
            styling={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: laptop ? 850 : (tablet ? 600 : (mobile ? 600 : 350)),
                    mt: 15,
                }}
            >
                <Masonry
                    columns={{ xs: 1, sm: 2, lg: 3}}
                    spacing={4}
                    sx={{
                        m: 0,
                    }}
                >
                    {articles ?
                        articles.map( ({title, slug, image, date_created}, index: number) => (
                                <Box
                                    key={index}
                                    className={'image-fade-in'}
                                    sx={{
                                        opacity: 0,
                                        minWidth: 250,
                                        width: 250,
                                        maxWidth: 250,
                                        boxShadow: '2px 2px 8px 0px #111',
                                        position: 'relative',
                                        display: 'flex',
                                    }}
                                >
                                    <NavLink
                                        to={`detail/${slug}/`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 8,
                                        }}
                                    ></NavLink>
                                    { IsAuthenticated() ?
                                        <>
                                            {/* Edit Icon */}
                                            <Box
                                                sx={{
                                                    boxSizing: 'border-box',
                                                    minHeight: 38,
                                                    maxHeight: 38,
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
                                                        padding: 0,
                                                        margin: 0
                                                    }}
                                                >
                                                    <Edit />
                                                </NavLink>
                                            </Box>

                                            {/* Delete Icon */}
                                            <DeleteArticleConfirmation
                                                refresh={ getArticles }
                                                slug={slug}
                                            />
                                        </>
                                    :
                                        <></>
                                    }

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
                                        <Skeleton variant="rectangular" width={250} height={150} />
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
                                        }}
                                    >
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                height: '15%',
                                                color: '#fff',
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
                                                textAlign: 'center',
                                                color: '#fff',
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </Box>
                                </Box>
                        ))
                    :
                        skeletonArticles && skeletonArticles.map( (item, index) => (
                            <Box key={index}>
                                <Skeleton variant="rectangular" width={250} height={item} />
                            </Box>
                        ))
                    }
                </Masonry>
            </Box>

        </PageWrapper>
    );
}