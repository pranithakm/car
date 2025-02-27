import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import img from '../assets/img.jpg';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      const result = await login(email, password);
      
      // Navigate based on user type and stored path
      if ('isAdmin' in result) {
        const lastPath = localStorage.getItem('lastPath');
        if (lastPath && lastPath.startsWith('/admin')) {
          navigate(lastPath);
        } else {
          navigate('/admin');
        }
      } else {
        const lastPath = localStorage.getItem('lastPath');
        if (lastPath && !lastPath.startsWith('/admin')) {
          navigate(lastPath);
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to sign in');
      }
      console.error(err);
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      const lastPath = localStorage.getItem('lastPath');
      if (lastPath) {
        navigate(lastPath);
      }else {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-section">
          <img src={img} alt="Car" />
        </div>
        <div className="form-section">
          <h2><span className="blue">Car</span><span className="red">space</span></h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button disabled={loading} type="submit" className="btn">
              Continue
            </button>
            {/* Only show Google login for non-admin emails */}
            {email !== 'admin@gmail.com' && (
              <>
                <div className="divider">or</div>
                <button 
                  type="button" 
                  onClick={handleGoogleLogin} 
                  disabled={loading} 
                  className="btn btn-google"
                >
                  Login with Google
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
