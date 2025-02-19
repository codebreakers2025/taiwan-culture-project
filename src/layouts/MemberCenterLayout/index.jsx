import { Outlet } from 'react-router-dom';
import MemberMenu from '@/layouts/MemberMenu';


const MemberLayout = () => {
  return (
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
  );
}
export default MemberLayout;