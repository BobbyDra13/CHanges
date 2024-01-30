import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import StoreLayout from 'views/Stores/Table/layout';
import EditStore from 'views/Team/updateStore';
import ProtectedRoute from './ProtectedRoute';



const Insight = Loadable(lazy(() => import('../views/Insights')));

const Brands = Loadable(lazy(() => import('../views/Brands')));

const Customers = Loadable(lazy(() => import('../views/Customers')));

const Team = Loadable(lazy(() => import('../views/Team')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/main',
  element: <ProtectedRoute element={<MainLayout />} />,
  children: [
    {
      path: '/main/insights', // Make this path relative to '/main'
      element: <Insight />,
    },
    {
      path: '/main/stores/layout',
      element: <StoreLayout />
    },
    {
      path: '/main/brands',
      element: <Brands />
    },
    {
      path: '/main/stores',
      element: <Customers />
    },
    {
      path: '/main/team',
      element: <Team />,
      children: [
        {
          path: 'edit/:id', // Make this path relative to '/team'
          element: <EditStore />
        }
      ]
    },
    { path: '/main/utils/util-typography', element: <UtilsTypography /> },
    { path: '/main/sample-page', element: <SamplePage /> }
  ]
};


export default MainRoutes;
