import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ManageListings from './components/ManageListings/ManageListings';
import AddCarForm from './components/AddCarForm/AddCarForm';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Login from './components/Login/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import AboutUs from './components/AboutUs/AboutUs';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { currentUser, isAdmin, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* User Routes */}
          <Route path="/" element={
            <ProtectedRoute>
            <UserDashboard />
            </ProtectedRoute>
          } />


          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/admin/manage-listings" element={
            <ProtectedRoute requireAdmin>
              <Layout><ManageListings /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/admin/add-car" element={
            <ProtectedRoute requireAdmin>
              <Layout><AddCarForm /></Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
