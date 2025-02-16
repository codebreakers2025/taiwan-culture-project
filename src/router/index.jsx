import { createHashRouter, Outlet } from "react-router-dom";
import Home from '@/pages/Home';
import ActivityList from '@/pages/ActivityList';
import Journal from '@/pages/Journal';

import CollectionList from '@/pages/Member/CollectionList';
import PersonalData from '@/pages/Member/PersonalData';
import OrderManagement from '@/pages/Member/OrderManagement';
import ActivityReview from '@/pages/Member/ActivityReview';
import SignIn from '@/pages/Member/SignIn';
import ActivityPoints from '@/pages/Member/ActivityPoints';
import CustomerSupport from '@/pages/Member/CustomerSupport';
import Center from '@/pages/Member/Center';
import Preferences from '@/pages/Member/Preferences';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Menu from '@/layouts/MemberCenter/Menu';

const Layout = () => (
  <>
    <Header />
    <main className="container-fluid gx-0">
      <Outlet />
    </main>
    <Footer />
  </>
);

const MemberLayout = () => (
  <>
    <div className="page-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <Menu />
          </div>
          <div className="col-lg-9">
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  </>
);

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '', 
          element: <Home />,
        },
        {
          path: 'activity-list',
          element: <ActivityList />,
        },
        {
          path: 'journal',
          element: <Journal />,
        },
        {
          path: '/member-center',
          element: <MemberLayout />,
          children:[
            {
              path: 'personal-data',
              element: <PersonalData />,
            },
            {
              path: 'order-management',
              element: <OrderManagement />,
            },
            {
              path: 'activity-review',
              element: <ActivityReview />,
            },
            {
              path: 'collection-list',
              element: <CollectionList />,
            },
            {
              path: 'sign-in',
              element: <SignIn />,
            },
            {
              path: 'activity-points',
              element: <ActivityPoints />,
            },
            {
              path: 'customer-support',
              element: <CustomerSupport />,
            },
            {
              path: 'center',
              element: <Center />,
            },
            {
              path: 'settings',
              element: <Preferences />,
            }
          ]
        }

      ],

    }
  ],
)

export default router;
