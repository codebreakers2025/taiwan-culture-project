import { createHashRouter, Outlet } from "react-router-dom";
import Home from '@/pages/Home';
import ActivityList from '@/pages/ActivityList';
import Journal from '@/pages/Journal';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';

const Layout = () => (
  <>
    <Header />
    <main className="container-fluid gx-0">
      <Outlet />
    </main>
    <Footer />
  </>
);

const router = createHashRouter([
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
      }
    ]
  }
])

export default router;