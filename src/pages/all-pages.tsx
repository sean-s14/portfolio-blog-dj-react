
import HomePage from 'src/pages/home-page';
import Page404 from 'src/pages/page-404';
import ContactPage from 'src/pages/contact-page';
import AboutPage from 'src/pages/about-page';

import { 
    BlogPage, 
    BlogListPage, 
    BlogDetailPage, 
    BlogDetailCreate,
    BlogDetailEdit
} from 'src/pages/blog/all-blogs';

import {
    ProjectsPage, 
    ProjectsListPage,
    ProjectsDetailPage,
    ProjectsDetailCreate,
    ProjectsDetailEdit,
} from 'src/pages/projects/all-projects';

export { 
    HomePage, AboutPage, ProjectsPage, 
    ProjectsListPage, ProjectsDetailPage, ProjectsDetailCreate,
    ProjectsDetailEdit, BlogPage, BlogListPage,
    BlogDetailPage, BlogDetailCreate, BlogDetailEdit,
    ContactPage, Page404,
}