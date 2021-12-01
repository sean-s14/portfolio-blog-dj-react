import React from 'react'
import {
    Typography,
    Skeleton,
    Grid,

    useMediaQuery,
} from '@mui/material';
import PageWrapper from 'src/layout/page-wrapper'
import { indigo } from '@mui/material/colors';
import responsive_png from 'src/img/responsive.png';
import {
    html, css, react, javascript, sass,     // Front-End
    api, django, python,                    // Back-End
    git, github, git_bash, figma, vscode,   // Tools
} from 'src/img/icons/all-icons';


export default function AboutPage() {

    const mobile = useMediaQuery('(min-width:600px)');

    const cards: {title: string, software: {icon: string, name: string}[]}[] = [
        {
            title: 'Front End',
            software: [
                {icon: javascript, name: 'Javascript'},
                {icon: react,   name: 'React'},
                {icon: html,    name: 'HTML5'},
                {icon: css,     name: 'CSS3'},
                {icon: sass,    name: 'Sass'},
            ]
        },
        {
            title: 'Back End',
            software: [
                {icon: python,  name: 'Python'},
                {icon: django,  name: 'Django'},
                {icon: api,     name: 'Django-Rest'},
            ]
        },
        {
            title: 'Tools',
            software: [
                {icon: git,     name: 'Git'},
                {icon: git_bash,name: 'Git-Bash'},
                {icon: github,  name: 'GitHub'},
                {icon: vscode,  name: 'VSCode'},
                {icon: figma,   name: 'Figma'},
            ]
        },
    ]

    return (
        <PageWrapper 
            // styling={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Grid
                container
                rowSpacing={6}
                columnSpacing={5}
                sx={{
                    // border: '2px solid black',
                    px: 5,
                    py: 5,
                    mb: 10,
                }}
            >
                {/* Header */}
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            fontSize: 45,
                            letterSpacing: 5,
                            textAlign: 'center',
                            my: 8
                            // border: '2px solid black'
                        }}
                    >
                        All About Me
                    </Typography>
                </Grid>

                {/* "I aim to build fast, responsive..." */}
                <Grid item xs={12} sm={6} md={5} 
                    sx={{
                        // textAlign: 'end'
                        display: 'flex',
                        justifyContent: mobile ? 'flex-end' : 'center',
                        // border: '2px solid black',
                    }}
                >
                    <Typography
                        // variant=""
                        sx={{
                            fontSize: 18,
                            letterSpacing: 1,
                            maxWidth: '20rem',
                        }}
                    >
                        I'm a full stack web developer based in London England, who aims to build fast, responsive designs with a smooth experience.<br/><br/>
                        I am eager to learn new things when the challenge arises, so don't hesitate to push me outside of my comfort zone a little.
                    </Typography>
                </Grid>

                {/* Responsive Image */}
                <Grid item xs={12} sm={6} md={7} 
                    sx={{
                        display: 'flex',
                        justifyContent: mobile ? 'flex-start' : 'center',
                        alignItems: 'center',
                        // border: '2px solid black'
                    }}
                >
                    {
                        responsive_png ?
                            <img
                                src={responsive_png}
                                alt={''}
                                style={{
                                    // border: '2px solid black',
                                    minWidth: '15rem',
                                    width: '80%',
                                    maxWidth: '25rem',
                                }}
                            ></img>
                        :
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    minWidth: '15rem',
                                    width: '80%',
                                    maxWidth: '25rem',
                                    height: '10rem'
                                }}    
                            />

                    }
                </Grid>

                {/* "and the software I use..." */}
                <Grid item xs={12} 
                    sx={{
                        mt: 6,
                        mb: 3,
                        textAlign: 'center'
                        // border: '2px solid black'
                    }}
                >
                    <Typography
                        // variant=""
                        sx={{
                            // fontWeight: '200',
                            fontWeight: 'fontWeightRegular',
                            fontSize: 20,
                            letterSpacing: 2,
                            // maxWidth: '15rem',
                        }}
                    >
                        and the software I use to make the magic happen...
                    </Typography>
                </Grid>

                {/* Cards */}
                { cards && cards.map( ({title, software}, index: number) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6} 
                        md={6}
                        lg={4}
                        sx={{
                            // border: '2px solid black'
                        }}
                    >
                        <Grid
                            container
                            rowSpacing={4}
                            sx={{
                                // border: '1px solid #fff',
                                textAlign: 'center',
                                py: 2,
                                justifyItems: 'center'
                            }}
                        >
                            <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
                                <Typography
                                    sx={{
                                        border: '4px solid #333',
                                        borderColor: indigo[900],
                                        color: '#fff',
                                        bgcolor: indigo[800],
                                        width: '10rem'
                                    }}
                                >
                                    {title}
                                </Typography>
                                {/* <Divider sx={{bgcolor: '#fff', width: '40%', mt: 1}}/> */}
                            </Grid>
                            { software && software.map( ({icon, name}, index: number) => (
                                <React.Fragment key={index}>

                                    {/* Icon Image */}
                                    <Grid 
                                        item xs={6}
                                        sx={{
                                            pr: 6,
                                            // border: '1px solid black',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        {   icon ?
                                                <img
                                                    src={icon}
                                                    alt={''}
                                                    style={{
                                                        // width: '2rem',
                                                        height: '2rem',
                                                    }}
                                                ></img>
                                            :
                                                <Skeleton
                                                    variant="rectangular"
                                                    sx={{
                                                        width: '2rem',
                                                        height: '2rem',
                                                    }}    
                                                />
                                        }
                                    </Grid>

                                    {/* Icon Name */}
                                    <Grid 
                                        item xs={6}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start'
                                        }}    
                                    >
                                        <Typography
                                            sx={{
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            
            </Grid>
        </PageWrapper>
    );
}