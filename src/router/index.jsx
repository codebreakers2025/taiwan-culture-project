import { createHashRouter, Outlet } from "react-router-dom";
import Home from '@/pages/Home';
import ActivityList from '@/pages/ActivityList';
import Journal from '@/pages/Journal';

import CollectionList from '@/pages/MemberCenter/CollectionList';
import PersonalData from '@/pages/MemberCenter/PersonalData';
import OrderManagement from '@/pages/MemberCenter/OrderManagement';
import ActivityReview from '@/pages/MemberCenter/ActivityReview';
import SignIn from '@/pages/MemberCenter/SignIn';
import ActivityPoints from '@/pages/MemberCenter/ActivityPoints';
import CustomerSupport from '@/pages/MemberCenter/CustomerSupport';
import Center from '@/pages/MemberCenter/Center';
import Settings from '@/pages/MemberCenter/Settings';

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
              element: <Settings />,
            }
          ]
        }

      ],

    }
  ],
)

export default router;
