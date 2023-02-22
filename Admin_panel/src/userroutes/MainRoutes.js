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
import Attendance from 'Pages/Attendance/Attendance';
import AttendanceStatus from 'Pages/Attendance/AttendanceStatus';
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
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />
                }
            ]
        },
        {
            path: '/user/attendance',
            element: <Attendance />
        },
        {
            path: '/user/attendance/status',
            element: <AttendanceStatus />
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
            path: '/dashboard/result',
            element: <Result />
        },
        {
            path: '/dashboard/result/detail/:id',
            element: <ResultDetail />
        }
    ]
};

export default MainRoutes;
