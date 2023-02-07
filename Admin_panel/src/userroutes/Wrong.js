/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate, useRoutes } from 'react-router-dom';
import SimpleLayout from '../layout/simple';
import Page404 from 'Pages/page404';

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

const Wrong = {
    // element: <SimpleLayout />,
    // children: [
    //     { path: '404', element: <Page404 /> },
    //     { path: '/*', element: <Navigate to="/404" /> },
    //     { path: '/dashboard/*', element: <Navigate to="/404" /> }
    // ]
};

export default Wrong;
