import 'src/App.css';

import {
  // Grid,
  Box
} from '@mui/material'

import {
  Navigation,
  // Footer
} from 'src/layout/all-layouts';

import {
  UsersPage,
  HomePage,
  AboutPage,
  ContactPage,
  ProjectsPage,
  ProjectsListPage,
  ProjectsDetailPage,
  ProjectsDetailCreate,
  ProjectsDetailEdit,
  BlogPage,
  BlogListPage,
  BlogDetailPage,
  BlogDetailCreate,
  BlogDetailEdit,
  Page404,
  TodoPage,
} from 'src/pages/all-pages';

import {
  PrivacyPolicyPage,
  CookiePolicyPage,
  TermsOfUsePage,
  DisclaimerPage
} from 'src/pages/policies/all-pages';

import {
  LoginPage,
  SignupPage,
  ProfilePage,
  SettingsPage
} from 'src/auth/pages/all-pages';

import LogoutButton from 'src/auth/components/logout-button';
import ProtectedRoute from 'src/auth/protected_route';

import {
    Switch,
    Route
} from "react-router-dom";

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import {
  useRef,
  useEffect,  // For loading screen
  // useContext // For theme
} from 'react';


import axios from 'axios';
// import { indigo } from '@mui/material/colors';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


// { hideLoader, showLoader } for loading screen
// { theme, ColorModeContext } for Theme
export default function App({ hideLoader, showLoader  }) {

  useEffect(hideLoader, [hideLoader]);  // For loading screen

  const nodeRef = useRef(null)
  
  const routes = [
    { path: '/',        Component: HomePage,      RouteType: Route,  inverted: false },
    { path: '/users',   Component: UsersPage,     RouteType: Route,  inverted: false },
    { path: '/contact', Component: ContactPage,   RouteType: Route,  inverted: false },
    { path: '/about',   Component: AboutPage,     RouteType: Route,  inverted: false },
    { path: '/projects',                    Component: ProjectsPage,    RouteType: Route,  inverted: false },
    { path: '/projects/all',                Component: ProjectsListPage, RouteType: Route,  inverted: false },
    { path: '/projects/detail/create',      Component: ProjectsDetailCreate,    RouteType: Route,  inverted: false },
    { path: '/projects/detail/edit/:slug',  Component: ProjectsDetailEdit,    RouteType: Route,  inverted: false },
    { path: '/projects/detail/:slug',       Component: ProjectsDetailPage,    RouteType: Route,  inverted: false },
    { path: '/blog',                  Component: BlogPage,        RouteType: Route,  inverted: false },
    { path: '/blog/all',              Component: BlogListPage,    RouteType: Route,  inverted: false },
    { path: '/blog/detail/create',    Component: BlogDetailCreate,  RouteType: Route,  inverted: false },
    { path: '/blog/detail/edit/:slug',Component: BlogDetailEdit,    RouteType: Route,  inverted: false },
    { path: '/blog/detail/:slug',     Component: BlogDetailPage,    RouteType: Route,  inverted: false },
    // Policies
    { path: '/privacy-policy',  Component: PrivacyPolicyPage, RouteType: Route,  inverted: false },
    { path: '/cookie-policy',   Component: CookiePolicyPage,  RouteType: Route,  inverted: false },
    { path: '/terms-of-use',    Component: TermsOfUsePage,    RouteType: Route,  inverted: false },
    { path: '/disclaimer',      Component: DisclaimerPage,    RouteType: Route,  inverted: false },
    // Protected Routes
    { path: '/login',   Component: LoginPage,     RouteType: ProtectedRoute,  inverted: true  },
    { path: '/signup',  Component: SignupPage,    RouteType: ProtectedRoute,  inverted: true  },
    { path: '/logout',  Component: LogoutButton,  RouteType: ProtectedRoute,  inverted: false },
    { path: '/profile', Component: ProfilePage,   RouteType: ProtectedRoute,  inverted: false },
    { path: '/settings',Component: SettingsPage,  RouteType: ProtectedRoute,  inverted: false },
    { path: '/todo',    Component: TodoPage,      RouteType: ProtectedRoute,  inverted: false },
  ];

  const navWidth = '10rem';

  return (
    <Box
      // container
      // direction='row'
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        p: 0,
        bgcolor: 'primary.main'
      }}
    >
      <Navigation navWidth={navWidth}/>

      <Route render={({location}) => (
        <TransitionGroup>
          <Switch location={location} >
            {routes.map(({ path, Component, RouteType, inverted }) => (
              <RouteType
                key={path}
                exact 
                path={path}
                {...inverted ? inverted : null}
              >
                {({ match }) => {
                  return (
                    <CSSTransition
                      nodeRef={nodeRef}
                      in={match != null}
                      timeout={450}
                      classNames="fade"
                      unmountOnExit
                    >
                      <div ref={nodeRef} style={{minWidth: `100% - ${navWidth}`, display: 'flex'}}>
                        <Component />
                      </div>
                    </CSSTransition>
                )}}
              </RouteType>
            ))}
            <Route
              key={'/'}
              path={'*'}
            >
              {({ match }) => {
                return (
                  <CSSTransition
                    nodeRef={nodeRef}
                    in={match != null}
                    timeout={450}
                    classNames="fade"
                    unmountOnExit
                  >
                    <div ref={nodeRef}>
                      <Page404 />
                    </div>
                  </CSSTransition>
              )}}
            </Route>
          </Switch>
        </TransitionGroup>
      )} />

      {/* <Footer /> */}
    
    </Box>
  );
}
