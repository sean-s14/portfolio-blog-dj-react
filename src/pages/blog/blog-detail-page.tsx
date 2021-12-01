import { useState, useEffect } from 'react';
import {
    Typography,
    // Skeleton,
    // Grid,
    Box,
    Paper,

    useMediaQuery
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper'
import { useParams, NavLink } from "react-router-dom";
import { axiosInstance } from 'src/axiosApi';
import { Edit } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { IsAuthenticated } from 'src/auth/is-authenticated';
import { DeleteArticleConfirmation } from 'src/components/all-components';
import ReactHtmlParser from 'react-html-parser';


export default function BlogDetailPage() {

    const [ article, setArticle]: any = useState();

    const { slug }: {slug: string} = useParams();

    useEffect( () => {
        axiosInstance
            .get(`/articles/${slug}`)
            .then( res => {
                setArticle( res.data );
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
                                to={`/blog/detail/edit/${slug}/`}
                                style={{
                                    color: green[300],
                                    // bgcolor: green[400]
                                }}
                            >
                                <Edit />
                            </NavLink>
                        </Box>
                        {/* Delete Icon */}
                        <DeleteArticleConfirmation
                            slug={slug}
                        />
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
                        {article && (`${new Date(article.date_created).getDate()} ${months[new Date(article.date_created).getMonth()]} ${new Date(article.date_created).getFullYear()}`)}
                    </Typography>

                    <Typography
                        variant='h5'
                        sx={{
                            mt: 1
                        }}
                    >
                        {article && article.title}
                    </Typography>

                    <Typography
                        component={'div'}
                        variant='body2'
                        sx={{
                            mt: 5
                        }}
                    >
                        {article && ReactHtmlParser(article.content)}
                    </Typography>

                </Box>
            </Paper>
        </PageWrapper>
    );
}