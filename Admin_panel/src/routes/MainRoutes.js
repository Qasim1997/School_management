/* eslint-disable no-unused-vars */

import { lazy } from 'react';

// project imports
// eslint-disable-next-line no-unused-vars
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Blog from '../Pages/Blog/Blog';
import BlogCreate from '../Pages/Blog/BlogCreate';
import Dashboard from '../Pages/User/Dashboard';
import IndexCLass from 'Pages/Class/IndexCLass';
import UpdateClass from 'Pages/Class/UpdateClass';
import AddClass from 'Pages/Class/AddClass';
import Teacher from 'Pages/Teacher/Teacher';
import AddTeacher from 'Pages/Teacher/AddTeacher';
import UpdateTeacher from 'Pages/Teacher/UpdateTeacher';
import AddBook from 'Pages/Books/AddBook';
import UpdateBook from 'Pages/Books/UpdateBook';
import Books from 'Pages/Books/Books';
import AddStudent from 'Pages/Student/AddStudent';
import UpdateStudent from 'Pages/Student/UpdateStudent';
import Student from 'Pages/Student/Student';
import Index from 'Pages/Parants/Index';
import AddParant from 'Pages/Parants/AddParant';
import Users from 'Pages/Authentication/Users';
import Calender from 'Pages/Calender/Calender';
import Library from 'Pages/Library/Library';
import AddLibrary from 'Pages/Library/AddLibrary';
import Result from 'Pages/Reasult/Result';
import ResultDetail from 'Pages/Reasult/ResultDetail';
import Fee from 'Pages/Fee/Fee';
import AddFee from 'Pages/Fee/AddFee';
import AddFeeID from 'Pages/Fee/AddFeeID';
import Setting from 'Pages/setting/Setting';
import ChangePassword from 'Pages/Authentication/ChangePassword';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            children: [
                {
                    path: '/dashboard',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: '/dashboard/setting',
            element: <Setting />
        },
        {
            path: '/dashboard/password',
            element: <ChangePassword />
        },
        {
            path: '/dashboard/blog',
            element: <Blog />
        },
        {
            path: '/dashboard/user',
            element: <Users />
        },
        {
            path: '/dashboard/blog/create',
            element: <BlogCreate />
        },
        {
            path: '/dashboard/class/create',
            element: <AddClass />
        },
        {
            path: '/dashboard/class',
            element: <IndexCLass />
        },
        {
            path: '/dashboard/class/:id',
            element: <UpdateClass />
        },
        {
            path: '/dashboard/teacher',
            element: <Teacher />
        },
        {
            path: '/dashboard/teacher/create',
            element: <AddTeacher />
        },
        {
            path: '/dashboard/teacher/:id',
            element: <UpdateTeacher />
        },
        {
            path: '/dashboard/book',
            element: <Books />
        },
        {
            path: '/dashboard/book/create',
            element: <AddBook />
        },
        {
            path: '/dashboard/book/:id',
            element: <UpdateBook />
        },
        {
            path: '/dashboard/parant',
            element: <Index />
        },
        {
            path: '/dashboard/parant/create',
            element: <AddParant />
        },
        {
            path: '/dashboard/student/:id',
            element: <UpdateStudent />
        },
        {
            path: '/dashboard/student',
            element: <Student />
        },
        {
            path: '/dashboard/student/create',
            element: <AddStudent />
        },
        {
            path: '/dashboard/student/:id',
            element: <UpdateStudent />
        },
        {
            path: '/dashboard/calender',
            element: <Calender />
        },
        {
            path: '/dashboard/library',
            element: <Library />
        },
        {
            path: '/dashboard/add/book',
            element: <AddLibrary />
        },
        {
            path: '/dashboard/fee',
            element: <Fee />
        },
        {
            path: '/dashboard/fee/create',
            element: <AddFee />
        },
        {
            path: '/dashboard/fee/create/:id',
            element: <AddFeeID />
        }
    ]
};

export default MainRoutes;
