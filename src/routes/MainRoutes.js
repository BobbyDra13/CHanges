import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import AddStore from 'views/Team/addStore';
import EditStore from 'views/Team/updateStore';

const Insight = Loadable(lazy(() => import('../views/Insights')));

const Stores = Loadable(lazy(() => import('../views/Stores')));

const Brands = Loadable(lazy(() => import('../views/Brands')));

const Customers = Loadable(lazy(() => import('../views/Customers')));

const Team = Loadable(lazy(() => import('../views/Team')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Insight />
    },
    {
      path: '/insights',
      element: <Insight />
    },
    {
      path: '/stores',
      element: <Stores />
    },
    {
      path: '/brands',
      element: <Brands />
    },
    {
      path: '/customers',
      element: <Customers />
    },
    {
      path: '/team',
      element: <Team />
    },
    {
      path: '/team/add',
      element: <AddStore/>
    },
    {
      path: '/team/edit/:id',
      element: <EditStore/>
    },

    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element: <SamplePage /> }
  ]
};

export default MainRoutes;
