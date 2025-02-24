import { createHashRouter } from "react-router-dom";

import HomePage from '@/pages/Home/HomePage';
import ActivityList from '@/pages/Home/ActivityList/ActivityListPage';
import ActivityDetailPage from '@/pages/Home/ActivityList/ActivityDetailPage';
import BookingPage1 from '@/pages/Home/ActivityList/Booking/Step1.jsx';
import BookingPage2 from '@/pages/Home/ActivityList/Booking/Step2.jsx';
import BookingPage3 from '@/pages/Home/ActivityList/Booking/Step3.jsx';
import BookingPage4 from '@/pages/Home/ActivityList/Booking/Step4.jsx';
import JournalList from '@/pages/Home/Journal/JournalListPage';

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

import AdminLayout from '@/layouts/AdminLayout';
import FrontendLayout from '@/layouts/FrontendLayout';
import MemberCenterLayout from '@/layouts/MemberCenterLayout';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <FrontendLayout />,
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
          path: '/journal-list',
          element: <JournalList />,
        }
      ],
    },
    {
      path: '/member-center',
      element: <MemberCenterLayout />,
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
          path: 'order-management/detail/:id',
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
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
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
    {
      path: '/admin/login', 
      element: <Login />,
    },
  ],
)

export default router;
