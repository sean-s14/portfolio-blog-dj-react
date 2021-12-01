import {
    Typography,
    Skeleton,
    Grid,

    useMediaQuery
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper'
import home_image from 'src/img/undraw_Code_thinking.png';


export default function HomePage() {

    
    // const tablet = useMediaQuery('(min-width:900px)');
    const mobile = useMediaQuery('(min-width:600px)');

    return (
        <PageWrapper
            styling={{
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
        >
            <Grid
                container
                rowSpacing={6}
                columnSpacing={5}
                wrap='wrap'
                sx={{
                    // border: '2px solid black',
                    px: 5,
                    mb: 10,
                    mt: mobile ? 0 : 20
                }}
            >
                <Grid item xs={12}>
                    <Typography
                        variant='h4'
                        sx={{
                            color: 'text.primary',
                            fontWeight: 'fontWeightRegular',
                            letterSpacing: 5,
                            textAlign: 'center',
                            // border: '2px solid black'
                        }}
                    >
                        Full Stack Web Developer
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={5} 
                    sx={{
                            display: 'flex',
                            justifyContent: mobile ? 'flex-end' : 'center',
                            alignItems: 'center',
                            // border: '1px solid black'
                    }}
                >
                    <Typography
                        variant={'body1'}
                        sx={{
                            color: 'text.primary',
                            // fontSize: mobile ? 32 : 24,
                            maxWidth: mobile ? '15rem' : '25rem',
                        }}
                    >
                        Hi, I’m Shaun!<br/>
                        I build fast responsive websites
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={7} 
                    sx={{
                        // border: '2px solid black'
                        display: 'flex',
                        justifyContent: mobile ? 'flex-start' : 'center',
                        alignItems: 'center',
                    }}
                >
                    {
                        home_image ?
                            <img
                                src={home_image}
                                alt={''}
                                style={{
                                    // border: '2px solid black',
                                    minWidth: '15rem',
                                    width: mobile ? '30rem' : '20rem',
                                }}
                            ></img>
                        :
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    width: '30rem',
                                    height: '10rem'
                                }}    
                            />

                    }
                </Grid>
            
            </Grid>

        </PageWrapper>
    );
}