import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';


  const AdminMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
  
    return (
      <>
      
    <div className={`sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`} 
        style={{
          minHeight: '100vh',
          width: isCollapsed ? '60px' : '250px',
          position: 'fixed',
          left: 0,
          top: 0,
          transition: 'width 0.3s ease'
        }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
        {!isCollapsed && <span className="fs-5">管理後台</span>}
        <button 
          className="btn btn-link text-white p-1"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className="bi bi-list fs-4"></i>
        </button>
      </div>
      
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link to="/admin/member" className={`nav-link text-white py-3 ${location.pathname === '/admin/member' ? 'active bg-primary' : ''}`}>
            <i className="bi bi-people me-3"></i>
            {!isCollapsed && <span>用戶管理</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/order-list" className={`nav-link text-white py-3 ${location.pathname === '/admin/order-list' ? 'active bg-primary' : ''}`}>
            <i className="bi bi-cart me-3"></i>
            {!isCollapsed && <span>訂單管理</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/blog" className={`nav-link text-white py-3 ${location.pathname === '/admin/blog' ? 'active bg-primary' : ''}`}>
            <i className="bi bi-file-text me-3"></i>
            {!isCollapsed && <span>部落格管理</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/activity-list" className={`nav-link text-white py-3 ${location.pathname === '/admin/activity-list' ? 'active bg-primary' : ''}`}>
            <i className="bi bi-star me-3"></i>
            {!isCollapsed && <span>活動管理</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/evaluation" className={`nav-link text-white py-3 ${location.pathname === '/admin/evaluation' ? 'active bg-primary' : ''}`}>
            <i className="bi bi-star me-3"></i>
            {!isCollapsed && <span>評價管理</span>}
          </Link>
        </li>
      </ul>
    </div>
  
        </>
    );
  };

  export default AdminMenu;
