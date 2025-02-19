import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FrontendLayout = () => {
  return (
    <>
      <Header />
      <main className="container-fluid gx-0">
        <Outlet />
      </main>
      <Footer />
    </>
  )
};

export default FrontendLayout;
