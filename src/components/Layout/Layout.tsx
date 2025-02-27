import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Side Navbar */}
      <nav className="side-navbar">
        <div className="logo">
          <Link to="/">
            <h1>Carspace</h1>
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/admin" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={`nav-item ${location.pathname === '/users' ? 'active' : ''}`}>
              <span className="nav-icon">👥</span>
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/responses" className={`nav-item ${location.pathname === '/responses' ? 'active' : ''}`}>
              <span className="nav-icon">💬</span>
              <span>Responses</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-listings" className={`nav-item ${location.pathname === '/manage-listings' ? 'active' : ''}`}>
              <span className="nav-icon">🚗</span>
              <span>Manage Listings</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/bookings" className={`nav-item ${location.pathname === '/bookings' ? 'active' : ''}`}>
              <span className="nav-icon">📅</span>
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/faqs" className={`nav-item ${location.pathname === '/faqs' ? 'active' : ''}`}>
              <span className="nav-icon">❓</span>
              <span>FAQs</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/blogs" className={`nav-item ${location.pathname === '/blogs' ? 'active' : ''}`}>
              <span className="nav-icon">📝</span>
              <span>Blogs</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="breadcrumb">
            {location.pathname === '/' ? 'Dashboard' : location.pathname.substring(1).replace(/-/g, ' ')}
          </div>
          <div className="user-menu" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <div className="user-avatar">A</div>
            <div className="user-name">Admin</div>
            {userMenuOpen && (
              <div className="user-dropdown">
                <button onClick={() => navigate('/admin/profile')}>Profile</button>
                <button onClick={() => navigate('/admin/settings')}>Settings</button>
                <button onClick={() => navigate('/login')}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
