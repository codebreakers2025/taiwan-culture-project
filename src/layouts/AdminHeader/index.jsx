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
import { AdminContext } from '@/layouts/AdminLayout';
import { useContext } from 'react';


  const AdminHeader = () => {
    const { toggleSidebar, toggleMobileNav, mobileNavOpen } = useContext(AdminContext);
 
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
          <div className="container-fluid">
            <button 
              className="btn btn-link text-dark d-none d-lg-block"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            {/* 移動端漢堡選單 - 控制側邊導航 */}
            <button 
              className="navbar-toggler border-0 d-lg-none"
              type="button"
              onClick={toggleMobileNav}
            >
              <Menu size={20} />
            </button>

            {/* Navbar 內容 */}
            <div className={`collapse navbar-collapse ${mobileNavOpen ? 'show' : ''}`}>
              <div className="d-flex align-items-center ms-auto">
                {/* Search */}
                <div className="position-relative me-3 d-none d-lg-block">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light ps-4" 
                    placeholder="搜尋..."
                    style={{ width: '250px' }}
                  />
                  <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
                </div>

                {/* Notifications */}
                <div className="dropdown me-3">
                  <button className="btn btn-link text-dark position-relative" data-bs-toggle="dropdown">
                    <Bell size={18} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      3
                    </span>
                  </button>
                </div>

                {/* User Menu */}
                <div className="dropdown">
                  <button className="btn btn-link text-dark d-flex align-items-center" data-bs-toggle="dropdown">
                    <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" 
                         style={{ width: '32px', height: '32px' }}>
                      <User size={16} className="text-white" />
                    </div>
                    <span className="ms-2">管理員</span>
                    <ChevronDown size={16} className="ms-2" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#"><User size={16} className="me-2" /> 個人資料</a></li>
                    <li><a className="dropdown-item" href="#"><Settings size={16} className="me-2" /> 設定</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#"><LogOut size={16} className="me-2" /> 登出</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
    
  
        </>
    );
  };

  export default AdminHeader;
