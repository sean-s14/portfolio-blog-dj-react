// @ts-nocheck
// Getting error because there is no 'alert' prop (which i added) on the 'useHistory' hook
import { useEffect, useState, useContext } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Button,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    Tooltip,

    Alert,
    Fade,

    useMediaQuery,
    useTheme, Theme,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { IsAuthenticated } from 'src/auth/is-authenticated';
import {
    NavLink,
    useHistory,
    // useLocation
} from "react-router-dom";
import LoginSignupDialog from 'src/auth/components/login-signup-dialog';
import LogoutButton from 'src/auth/components/logout-button';
import SubscriptionDialog from 'src/components/subscription-dialog';
import SideNav from 'src/layout/side-nav';
import q_img from 'src/img/question_mark.png';
import { 
    KeyboardArrowDown, Person, Logout, Settings, HelpOutline, Menu as MenuIcon, Home, ListAlt, Close as CloseIcon,
    Brightness4, Brightness7, // Phone, AccountCircle
} from '@mui/icons-material';

import { ColorModeContext } from 'src/theme/AppThemeWrapper';

export default function Navigation() {

    const colorMode = useContext(ColorModeContext)


    const tablet = useMediaQuery('(min-width:900px)');
    const mobile = useMediaQuery('(min-width:400px)');

    const theme: Theme = useTheme()
    
    const sideNavWidth = mobile ? '15rem' : '100vw'
    const [sideBarOpen, setSideBarOpen] = useState(`-${sideNavWidth}`)

    const toggleSideNav = () => setSideBarOpen( sideBarOpen === '0' ? `-${sideNavWidth}` : '0');

    let history: any = useHistory();
    // let location = useLocation();
    
    // useEffect ( () => {
    //     console.log("Navigation: " + location.pathname)
    // }, [location])

    useEffect(() => {
        // Not sure what the 'history.listen' is for? (For listening to changes in history?)
        history.listen((location) => {
            setSideBarOpen(`-${sideNavWidth}`);
        })
     },[history, sideNavWidth]) 

    const changePath = (e) => history.push(e.target.pathname);

    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const routes = [
        { title: 'Home',    route: '/',      icon: <Home />, },
        { title: 'Users',   route: '/users', icon: <HelpOutline /> },
        { title: 'Todo',    route: '/todo',  icon: <ListAlt /> },
    ]

    const userOptions = [
        { title: 'Profile',  route: '/profile',  icon: <Person sx={{mr: 1}}/> },
        { title: 'Settings', route: '/settings', icon: <Settings sx={{mr: 1}}/> },
    ]

    const navHeight = '5rem';

    const [ alert, setAlert]: any = useState({open: false, msg: ''});

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


    return (
        <Box component='nav' sx={{ width: '100%', height: navHeight, backgroundColor: '#333'}}>
            
            <Box 
                sx={{
                    width: '100vw',
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

            <AppBar 
                position="static"
                enableColorOnDark
                sx={{
                    height: navHeight,
                    justifyContent: 'center',
                    alignItems: 'space-between',
                    // bgcolor: '#333',
                    // backgroundColor: themeType.palette.mode === 'dark' ? 'primary.dark' : 'primary',
                    bgcolor: theme.palette.mode === 'dark' ? '#333' : '#666',
                }}
            >
                <Toolbar 
                    // sx={{justifyContent: 'space-between'}}
                >

                    <Tooltip
                        arrow
                        title={ theme.palette.mode === 'dark' ? 'Dark' : 'Light' }
                    >
                        <Box
                            sx={{
                                mr: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton 
                                onClick={ colorMode.toggleColorMode }
                                color="inherit"
                            >
                                { theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4 />}
                            </IconButton>
                        </Box>
                    </Tooltip>

                    {/* Website Title */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            // color: theme.palette.mode === 'dark' ? 'text.primary' : grey[200],
                            color: theme.palette.mode === 'dark' ? grey[200] : grey[800],
                        }}
                    >
                        <NavLink to="/" activeStyle={{ textDecoration: 'none', color: '#FFF' }}>
                            Website Name
                        </NavLink>
                    </Typography>

                    { tablet ?
                        // If it the screen is larger than 900px
                        ( routes ? // If routes exist
                            <Box 
                                sx={{
                                    mr: 4
                                }}
                            >
                                { routes.map( ( { title, route }, index: number) => (
                                    <NavLink
                                        key={index}
                                        exact
                                        to={route}
                                        activeStyle={{
                                            color: 'red',
                                            backgroundColor: '#292929',
                                        }}
                                        style={{ 
                                            textDecoration: 'none',
                                            marginRight: '.8rem',
                                            color: '#fff',
                                            padding: '.35rem .7rem',
                                            borderRadius: '.3rem',
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
                        )
                    :   // If the screen is smaller than 900px
                        <>
                            {/* Button to toggle side-nav */}
                            <IconButton
                                size="small"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ 
                                    mr: 0, 
                                    display: tablet ? 'none' : 'block',
                                    '& .MuiSvgIcon-fontSizeMedium': {
                                        fontSize: '60px'
                                    },
                                    // bgcolor: 'red',
                                    borderRadius: '.3rem',
                                    p: 0,
                                    width: '3rem',
                                    height: '3rem'
                                }}
                                onClick={ () => toggleSideNav() }
                            >
                                <MenuIcon
                                    sx={{
                                        // bgcolor: '#292929',
                                        transition: 'background-color .3s',
                                        '&:hover': {
                                            bgcolor: '#292929',
                                        },
                                        borderRadius: '.3rem',
                                        py: '.0rem',
                                        px: '.2rem',
                                        width: '3rem',
                                        height: '3rem'
                                    }}
                                />
                            </IconButton>

                            <SideNav 
                                sideBarOpen={sideBarOpen}
                                toggleSideNav={toggleSideNav} 
                                sideNavWidth={sideNavWidth}
                                navHeight={navHeight}
                                mobile={mobile}
                                tablet={tablet}
                                routes={routes}
                                userOptions={userOptions}
                            />
                        </>
                    }

                    {/* Subscription Button | null */}
                    { tablet ?
                        <>
                            <SubscriptionDialog  
                                btnStyle={{
                                    width: '4rem',
                                    // height: '2rem',
                                    bgcolor: blue[700],
                                    '&:hover': {
                                        bgcolor: blue[900]
                                    },
                                    textTransform: 'none',
                                    transition: 'background-color .2s',
                                    fontSize: '.7rem',
                                    borderRadius: '0',
                                }}
                            />
                            <Divider
                                orientation='vertical'
                                sx={{
                                    borderColor: 'white',
                                    // borderWidth: '.1rem'
                                    mx: 2
                                }}
                            />
                        </>
                    :
                        null
                    }

                    {/* Profile | "Login and Signup options" */}
                    { IsAuthenticated() ?
                        // If larger than 900px ? Profile : null
                        ( tablet ?
                            <Box 
                                sx={{
                                    ml: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <NavLink
                                    to='/profile'
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        minWidth: '2.5rem',
                                        width: '2.5rem',
                                        maxWidth: '2.5rem',
                                        height: '2.5rem'
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: '#fff',
                                            border: '.2rem solid transparent',
                                            borderRadius: '.2rem 0 0 .2rem',
                                            height: '2.1rem',
                                            width: '2.1rem',
                                            m:0,
                                        }}
                                        variant="square"
                                        alt='Question Mark'
                                        src={q_img}
                                    >
                                    </Avatar>
                                </NavLink>
                                <Divider orientation='vertical'/>
                                <Button
                                    id="demo-customized-button"
                                    aria-controls="demo-customized-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    disableElevation
                                    onClick={handleClick}
                                    sx={{
                                        m: 0,
                                        p: 0,
                                        height: '2.5rem',
                                        minWidth: '1.2rem',
                                        maxWidth: '1.2rem',
                                        borderRadius: '0 .2rem .2rem 0',
                                        bgcolor: '#fff',
                                        '&:hover': {
                                            bgcolor: '#fff',
                                            color: '#333',
                                            borderRadius: '0 .2rem .2rem 0',
                                        }
                                    }}
                                >
                                    <KeyboardArrowDown 
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            color: '#333',
                                            borderRadius: '0 .2rem .2rem 0',
                                            '&:hover': {
                                                bgcolor: '#fff',
                                                color: '#333',
                                                borderRadius: '0 .2rem .2rem 0',
                                            }
                                        }}
                                    />
                                </Button>
                                <Menu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    { userOptions ?
                                        userOptions.map( ({icon, title, route}, index: number) => (
                                            <NavLink 
                                                to={route}
                                                key={index}
                                                style={{
                                                    color: '#333',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <MenuItem onClick={handleClose} disableRipple >
                                                    { icon }
                                                    { title }
                                                </MenuItem>
                                            </NavLink>
                                        ))
                                    :
                                        null
                                    }
                                    <Divider />
                                    <MenuItem 
                                        onClick={handleClose} 
                                        disableRipple
                                        sx={{
                                            p: 0
                                        }}
                                    >
                                        <LogoutButton
                                            styling={{
                                                width: '100%',
                                                height: '100%',
                                                p: 1,
                                                color: 'inherit',
                                                '&:hover': {
                                                    bgcolor: 'transparent'
                                                }
                                            }}
                                        >
                                            <Logout sx={{mr:1}}/>
                                            Logout
                                        </LogoutButton>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        :
                            null
                        )
                    :   // Login & Signup Buttons
                        tablet ? <LoginSignupDialog /> : null 
                    }


                </Toolbar>
            </AppBar>
        </Box>
    );
}