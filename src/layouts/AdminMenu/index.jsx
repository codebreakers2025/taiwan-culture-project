import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu,
  Users,
  Home,
  Settings,
  Bell,
  User,
  Search,
  Package,
  FileText,
  Mail,
  LogOut,
  ChevronDown
} from 'lucide-react';
import './Menu.scss';
import { useContext } from 'react';
import { AdminContext } from '@/layouts/AdminLayout';


  const AdminMenu = () => {
    const { sidebarOpen, mobileNavOpen } = useContext(AdminContext);
    const location = useLocation();

    return (
      <>
      {/* Sidebar */}
      <div className={`bg-dark text-white position-fixed h-100 ${sidebarOpen ? 'width-240' : 'width-70'} 
                   ${mobileNavOpen ? 'show' : 'd-none d-lg-block'}`}
          style={{ 
              transition: 'width 0.3s ease-in-out',
              width: sidebarOpen ? '240px' : '70px',
              zIndex: 1040
          }}>
          <div className="d-flex flex-column h-100">
          {/* Logo */}
          <div className="p-3 border-bottom border-secondary">
              <div className="d-flex align-items-center">
              <Package size={24} className="text-primary" />
              {sidebarOpen && <span className="ms-2 fw-bold fs-5">管理系統</span>}
              </div>
          </div>

          {/* Menu Items */}
          <div className="p-3">
              <ul className="nav flex-column">
              <li className="nav-item mb-2">
                  <Link to="/admin/member" className={`nav-link text-white d-flex align-items-center ${location.pathname === '/admin/member' ? 'active bg-primary rounded' : ''}`}>
                  <Home size={18} />
                  {sidebarOpen && <span className="ms-2">用戶管理</span>}
                  </Link>
              </li>
              <li className="nav-item mb-2">
                  <Link to="/admin/order-list" className={`nav-link text-white d-flex align-items-center ${location.pathname === '/admin/order-list' ? 'active bg-primary rounded' : ''}`}>

                  
                  <Users size={18} />
                  {sidebarOpen && <span className="ms-2">訂單管理</span>}
                  
                  </Link>
              </li>
              <li className="nav-item mb-2">
                  <Link to="/admin/blog" className={`nav-link text-white d-flex align-items-center ${location.pathname === '/admin/blog' ? 'active bg-primary rounded' : ''}`}>

              
                  <FileText size={18} />
                  {sidebarOpen && <span className="ms-2">部落格管理</span>}
              
                  </Link>
              </li>
              <li className="nav-item mb-2">
                  <Link to="/admin/activity-list" className={`nav-link text-white d-flex align-items-center ${location.pathname === '/admin/activity-list' ? 'active bg-primary rounded' : ''}`}>

              
                  <Mail size={18} />
                  {sidebarOpen && <span className="ms-2">活動管理</span>}
              
                  </Link>
              </li>
              <li className="nav-item mb-2">
                  <Link to="/admin/evaluation" className={`nav-link text-white d-flex align-items-center ${location.pathname === '/admin/evaluation' ? 'active bg-primary rounded' : ''}`}>
                  <Mail size={18} />
                  {sidebarOpen && <span className="ms-2">評價管理</span>}
                  </Link>
              </li>

              <li className="nav-item">
                  <a className="nav-link text-white d-flex align-items-center">
                  <Settings size={18} />
                  {sidebarOpen && <span className="ms-2">系統設置</span>}
                  </a>
              </li>
              </ul>
          </div>
          </div>
      </div>

      
    
  
        </>
    );
  };

  export default AdminMenu;
