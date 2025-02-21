import { Outlet } from 'react-router-dom';
import MemberMenu from '@/layouts/MemberMenu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserProvider } from "@/components/UserContext";

const MemberLayout = () => {
  return (
    <>
      <Header />
      {/* <UserProvider> */}
        <div className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <MemberMenu />
              </div>
              <div className="col-lg-9">
                  <Outlet />
              </div>
            </div>
          </div>
        </div>
        {/* </UserProvider> */}
      <Footer />
    </>
  );
}
export default MemberLayout;