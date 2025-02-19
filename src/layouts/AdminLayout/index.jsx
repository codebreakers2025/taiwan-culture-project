import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '@/layouts/AdminMenu';
import AdminHeader from '@/layouts/AdminHeader';

// 創建上下文來管理側邊欄狀態
export const AdminContext = createContext();

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  const contextValue = {
    sidebarOpen,
    mobileNavOpen,
    toggleSidebar,
    toggleMobileNav
  };

  return (
    <AdminContext.Provider value={contextValue}>
      <div className="admin-page-section min-vh-100 d-flex">
        <AdminMenu />
        <div className="flex-grow-1 bg-light" 
          style={{ 
            marginLeft: sidebarOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease-in-out'
          }}
        >
          <AdminHeader />
          <Outlet />
        </div>
      </div>
    </AdminContext.Provider>
  );
};


export default AdminLayout;