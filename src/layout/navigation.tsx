// @ts-nocheck
// Getting error because there is no 'alert' prop (which i added) on the 'useHistory' hook
import { useEffect, useState, useContext } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Divider,
    Button,
    IconButton,
    Tooltip,

    Alert,
    Fade,

    useMediaQuery,
    useTheme, Theme,
} from '@mui/material';
// import { indigo } from '@mui/material/colors';
import { IsAuthenticated } from 'src/auth/is-authenticated';
import {
    NavLink,
    useHistory,
} from "react-router-dom";
import LoginDialog from 'src/auth/components/login-dialog';
import LogoutButton from 'src/auth/components/logout-button';
import { ContactDialog, SubscriptionDialog } from 'src/components/all-components';
import { 
    HomeSharp, AccountBoxSharp, PermMediaSharp, ArticleSharp, PhoneSharp,
    Close as CloseIcon, Brightness4, Brightness7, Telegram, GitHub, MenuSharp,
    ArrowLeftSharp,
} from '@mui/icons-material';
import profile from 'src/img/me-1.jpg';
import { ColorModeContext } from 'src/theme/AppThemeWrapper';

interface NavigationProps {
    navWidth: string;
}

export default function Navigation({ navWidth }: NavigationProps) {


    const colorMode = useContext(ColorModeContext)

    const tablet = useMediaQuery('(min-width:900px)');
    // const mobile = useMediaQuery('(min-width:600px)');

    const theme: Theme = useTheme()

    const [navOpen, setNavOpen] = useState(true)

    const toggleSideNav = () => setNavOpen(!navOpen);

    useEffect(() => {
        setNavOpen(tablet ? true : false);
     },[navWidth, tablet])

    let history: any = useHistory();

    const changePath = (e) => history.push(e.target.pathname);

    useEffect(() => {
        history.listen((location) => {
            setNavOpen(tablet ? true : false);
        })
     },[history, navWidth, tablet])

    const routes = [
        { title: 'Home',        route: '/',         icon: <HomeSharp />, },  // Welcome Page
        { title: 'About',       route: '/about',    icon: <AccountBoxSharp /> },
        { title: 'Projects',    route: '/projects', icon: <PermMediaSharp /> },
        { title: 'Blog',        route: '/blog',     icon: <ArticleSharp /> },
        { title: 'Contact',     route: '/contact',  icon: <PhoneSharp /> },
    ]

    // const userOptions = [
    //     { title: 'Profile',  route: '/profile',  icon: <Person sx={{mr: 1}}/> },
    //     { title: 'Settings', route: '/settings', icon: <Settings sx={{mr: 1}}/> },
    // ]

    const policies = [
        {title: 'Privacy Policy', route: 'privacy-policy'},
        {title: 'Cookie Policy', route: 'cookie-policy'},
        {title: 'Terms Of Use', route: 'terms-of-use'},
        {title: 'Disclaimer', route: 'disclaimer'},
    ]

    const socials: {link: string, icon: any}[] = [
        {
            link: '',
            icon: <Telegram sx={{
                color: '#fff', bgcolor: '#35ACE0', borderRadius: '2rem', p: 1,
            }}/> 
        },
        {
            link: '',
            icon: <GitHub sx={{
                color: '#fff', bgcolor: '#111', borderRadius: '.3rem', p: 1,
            }}/>
        },
    ]

    const navHeight = '100vh';

    const [ alert, setAlert]: any = useState({open: false, msg: ''});

    // Shows Alert if there is an alert
    useEffect( () => {
        history.listen((location) => {
            if ('alert' in history) {
                if ('open' in history['alert']) {
                    let myHis = history['alert']; 
                    setAlert({
                        open: myHis['open'],
                        msg: myHis['msg']
                    })
                    // console.log(history['alert'])
                }
            } // else { console.log('No "alert" prop on history variable') }
        })
    }, [history])

    const closeAlert = () => {
        setAlert({...alert, open: false});
        history['alert'] = {open: false}
    }

    const copyright_year = new Date().getFullYear()

    const offsetButtonStyles: {} = {
        width: '8rem',
        height: '2.5rem',
        mb: 2,
        pointerEvents: 'all',
        borderRadius: '0',
        display: 'flex',
        justifyContent: 'space-around',
        textTransform: 'none',

        color: 'text.primary',
        border: '4px solid #333',
        borderColor: 'primary.dark',
        bgcolor: tablet ? 'primary.main' : 'primary.light',
        '&:hover': {
            bgcolor: 'primary.light'
        },
    }

    const [offsetBtnsOpen, setOffsetBtnsOpen] = useState<boolean>(true)

    const toggleOffsetBtns = () => setOffsetBtnsOpen(!offsetBtnsOpen)


    return (
        <Box
                component='nav'
                sx={{
                    minWidth: navWidth,
                    width: navWidth,
                    minHeight: navHeight,
                    bgcolor: 'primary.main',
                    borderRight: '3px solid black',
                    borderColor: 'primary.dark',
                    overflowY: 'scroll',
                    position: tablet ? 'relative' : 'absolute',
                    top: tablet ? null : 0,
                    left: navOpen ? '0' : `-${navWidth}`,
                    transition: 'left 0.6s ease',
                    zIndex: 10,
                }}
                className='no_scrollbar'
            >
                
                {/* Alert Messages */}
                <Box 
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'fixed',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}
                >
                    {/* Alert Messages */}
                    <Fade in={alert.open}>
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={ closeAlert }
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mt: 2, mx: 1, pointerEvents: 'all' }}
                        >
                        { alert.msg }
                        </Alert>
                    </Fade>
                </Box>

                {/* (Fixed) Navigation Toggle Button */}
                <Button
                    sx={{
                        display: tablet ? 'none' : 'flex', 
                        position: 'fixed',
                        top: 10,
                        left: 10,
                        zIndex: 4,
                        opacity: navOpen ? 0 : 1,
                        transition: `opacity .5s ease ${navOpen ? '0.02s' : '0.5s'}`
                    }}
                    onClick={ toggleSideNav }
                >
                    <MenuSharp
                        sx={{
                            width: '4rem',
                            height: '4rem',
                            color: '#fff'
                        }}
                    />
                </Button>

                {/* Navigation Content */}

                <Box
                    // position="static"
                    // enableColorOnDark
                    sx={{
                        height: navHeight,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 5
                    }}
                >

                    {/* Navigation Toggle Button */}
                    <Button
                        sx={{
                            display: tablet ? 'none' : 'block',
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                        onClick={ toggleSideNav }
                    >
                        <MenuSharp
                            sx={{
                                width: '4rem',
                                height: '4rem',
                                color: '#fff'
                            }}
                        />
                    </Button>

                    {/* Profile Image */}
                    <Avatar
                        src={profile}
                        alt='Shaun Stokers Profile Image'
                        variant='square'
                        sx={{
                            mt: tablet ? 4 : 15,
                            mb: 2,
                            width: '7rem',
                            height: '7rem',
                            // borderRadius: 2,
                            border: '8px solid #333',
                            borderColor: 'primary.dark',
                        }}
                    />

                    {/* Name Under Profile */}
                    <Typography
                        variant='subtitle2'
                        sx={{
                            mb: 4,
                            color: 'text.primary',
                        }}
                    >
                        Shaun Stocker
                    </Typography>
                    
                    {routes ? // If routes exist
                        <Box 
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                py: 3,
                                bgcolor: 'primary.dark',
                                color: 'text.primary',
                                fontWeight: 'fontWeightRegular'
                            }}
                        >
                            { routes.map( ( { title, route }, index: number) => (
                                <NavLink
                                    key={index}
                                    exact
                                    to={route}
                                    activeStyle={{
                                        fontSize: '1.5rem'
                                    }}
                                    style={{ 
                                        color: 'inherit',
                                        // fontWeight: 'inherit',
                                        textDecoration: 'none',
                                        padding: '.35rem .7rem',
                                        borderRadius: '.3rem',
                                        height: '2.5rem',
                                        maxHeight: '2.5rem',
                                    }}
                                    className="nav_link"
                                    onClick={changePath}
                                >
                                    {title}
                                </NavLink>
                            )) }
                        </Box>
                    :  // No routes
                        null
                    }


                    {/* Socials */}
                    <Typography sx={{color: 'text.primary', my: 2, fontSize: 16}}>
                        I am active on:
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex', mb: 2
                        }}
                    >
                        { socials.map( ({link, icon}, index: number) => (
                            <NavLink
                                key={index}
                                to={link}
                                style={{marginRight: '0.8rem'}}
                            >
                                {icon}
                            </NavLink>
                        ))}
                    </Box>


                    {/* Legal */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            p: 2,
                            color: 'text.primary',
                        }}
                    >
                        <Typography
                            component="p"
                            sx={{
                                color: 'inherit',
                                fontSize: 12,
                                mb: 2
                            }}
                        >
                            Copyright &copy; {copyright_year} Shaun Stocker
                        </Typography>

                        <Typography
                            component="p"
                            sx={{
                                color: 'inherit',
                                fontSize: 14,
                                mb: 2
                            }}
                        >
                            s.stocker04@outlook.com
                        </Typography>

                        { policies && policies.map( ({title, route}, index: number) => (
                            <NavLink
                                key={index}
                                to={route}
                                style={{color: 'inherit'}}
                            >
                                <Typography
                                    component="p"
                                    sx={{
                                        fontSize: '.9rem',
                                        mb: 1
                                    }}
                                >
                                    { title }
                                </Typography>
                            </NavLink>
                        ))}
                    </Box>

                    <Divider
                        sx={{
                            borderColor: 'text.primary',
                            my: 1,
                            width: '90%'
                        }}
                    />

                    {/* Admin Login */}
                    { IsAuthenticated() ?
                        <>
                            <LogoutButton 
                                styling={{
                                    mt: 1,
                                    textTransform: 'none',
                                    fontWeight: 'fontWeightRegular',
                                    color: 'text.primary',
                                    bgcolor: 'primary.dark',
                                    '&:hover': {
                                        bgcolor: 'primary.light'
                                    },
                                    width: '100%'
                                }}
                            />

                            {/* New Article Button */}
                            <Button
                                sx={{
                                    mt: 1,
                                    textTransform: 'none',
                                    fontWeight: 'fontWeightRegular',
                                    color: 'text.primary',
                                    bgcolor: 'primary.dark',
                                    '&:hover': {
                                        bgcolor: 'primary.light'
                                    },
                                    width: '100%'
                                }}
                            >
                                <NavLink
                                    to={'/blog/detail/create'}
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'none'
                                    }}
                                >
                                    New Post +
                                </NavLink>
                            </Button>

                            {/* New Project Button */}
                            <Button
                                sx={{
                                    mt: 1,
                                    textTransform: 'none',
                                    fontWeight: 'fontWeightRegular',
                                    color: 'text.primary',
                                    bgcolor: 'primary.dark',
                                    '&:hover': {
                                        bgcolor: 'primary.light'
                                    },
                                    width: '100%'
                                }}
                            >
                                <NavLink
                                    to={'/projects/detail/create'}
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'none'
                                    }}
                                >
                                    New Project +
                                </NavLink>
                            </Button>
                        </>
                    :
                        <LoginDialog 
                            btnStyle={{
                                // mb: 5,
                                pointerEvents: 'all',
                                borderRadius: '0',
                                color: 'text.primary',
                                textDecoration: 'underline !important',
                                display: 'flex',
                                justifyContent: 'space-around',
                                textTransform: 'none',
                                fontSize: 15
                            }}
                        />
                    }

                    {/* This is to add space at the bottom of navigation */}
                    <Box sx={{height: '1rem', width: '100%', display: 'flex', opacity: 0}}>h</Box>

                {/* End of Navigation content */}
                </Box>

                {/* ===== Offset buttons (subscribe, contact, theme) ===== */}

                {/* Toggle offset buttons */}
                <IconButton
                    sx={{
                        ...offsetButtonStyles,
                        position: 'fixed',
                        top: 20,
                        right: 30,
                        zIndex: 10,
                        width: '2rem',
                        height: '2rem',
                    }}
                    onClick={ toggleOffsetBtns }
                >
                    <ArrowLeftSharp 
                        sx={{
                            transform: offsetBtnsOpen ? 'none' : 'rotate(-90deg)',
                            transition: 'transform 0.8s ease'
                        }}
                    />
                </IconButton>

                {/* Offset Buttons */}
                <Box
                    sx={{
                        width: offsetBtnsOpen ? '8rem' : 0,
                        overflow: 'hidden',
                        transition: 'width .8s ease',
                        position: 'fixed',
                        top: 50,
                        right: 30,
                        zIndex: '10',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        pt:3,
                        pointerEvents: 'none',
                    }}
                >

                    {/* Dialog Buttons */}
                    <ContactDialog
                        btnStyle={{
                            ...offsetButtonStyles,
                        }}
                    />

                    <SubscriptionDialog
                        btnStyle={{
                            ...offsetButtonStyles,
                        }}
                    />

                    {/* Theme Button */}
                    <Tooltip
                        arrow
                        title={ theme.palette.mode === 'dark' ? 'Dark' : 'Light' }
                    >
                        <IconButton
                            onClick={ colorMode.toggleColorMode }
                            size='small'
                            color="inherit"
                            sx={{
                                ...offsetButtonStyles,
                                p: '0 !important',
                                fontSize: 17
                            }}
                        >
                            Theme
                            { theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>

                </Box>
            
            </Box>

    );
}