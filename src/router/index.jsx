import { createHashRouter, Outlet } from "react-router-dom";
import HomePage from '@/pages/Home/HomePage';
import ActivityList from '@/pages/Home/ActivityList/ActivityListPage';
import ActivityDetailPage from '@/pages/Home/ActivityList/ActivityDetailPage';
import BookingPage1 from '@/pages/Home/ActivityList/Booking/Step1.jsx';
import BookingPage2 from '@/pages/Home/ActivityList/Booking/Step2.jsx';
import BookingPage3 from '@/pages/Home/ActivityList/Booking/Step3.jsx';
import BookingPage4 from '@/pages/Home/ActivityList/Booking/Step4.jsx';
import Journal from '@/pages/Home/Journal';

import CollectionList from '@/pages/Home/Member/CollectionList';
import PersonalData from '@/pages/Home/Member/PersonalData';
import OrderListPage from '@/pages/Home/Member/OrderManagement/OrderListPage';
import OrderDetailPage from '@/pages/Home/Member/OrderManagement/OrderDetailPage';
import ActivityReview from '@/pages/Home/Member/ActivityReview';
import SignIn from '@/pages/Home/Member/SignIn';
import ActivityPoints from '@/pages/Home/Member/ActivityPoints';
import CustomerSupport from '@/pages/Home/Member/CustomerSupport';
import Center from '@/pages/Home/Member/Center';
import Preferences from '@/pages/Home/Member/Preferences';

import Login from '@/pages/Admin/Login';
import Dashboard from '@/pages/Admin/Dashboard';
import MemberManage from '@/pages/Admin/MemberManage';
import OrderListManage from '@/pages/Admin/OrderListManage';
import BlogManage from '@/pages/Admin/BlogManage';
import ActivityManage from '@/pages/Admin/ActivityManage';
import EvaluationManage from '@/pages/Admin/EvaluationManage';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Menu from '@/layouts/MemberCenterMenu';
import AdminMenu from '@/layouts/AdminMenu';

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

const AdminLayout = () => (
  <>
  <div className="admin-page-section">
    <div className="container-fluid">
      <div className="row">
            <AdminMenu />
            <main className="col-md-10 ms-sm-auto px-md-4">
              <Outlet />
            </main>
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
          element: <HomePage />,
        },
        {
          path: '/activity-list',
          element: <ActivityList />,
        },
        {
          path: '/activity-list/:id',
          element: <ActivityDetailPage />,
        },
        {
          path: '/activity-list/booking1',
          element: <BookingPage1 />,
        },
        {
          path: '/activity-list/booking2',
          element: <BookingPage2 />,
        },
        {
          path: '/activity-list/booking3',
          element: <BookingPage3 />,
        },
        {
          path: '/activity-list/booking4',
          element: <BookingPage4 />,
        },
        {
          path: '/journal',
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
              path: 'order-management/list',
              element: <OrderListPage />,
            },
            {
              path: 'order-management/detail',
              element: <OrderDetailPage />,
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
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'login', 
          element: <Login />,
        },
        {
          path: 'dashboard', 
          element: <Dashboard />,
        },
        {
          path: 'member',
          element: <MemberManage />,
        },
        {
          path: 'order-list',
          element: <OrderListManage />,
        },
        {
          path: 'blog',
          element: <BlogManage />,
        },
        {
          path: 'activity-list',
          element: <ActivityManage />,
        },
        {
          path: 'evaluation',
          element: <EvaluationManage />,
        }
      ]
    },
  ],
)

export default router;
