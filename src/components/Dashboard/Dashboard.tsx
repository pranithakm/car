import React, { useState, useEffect } from 'react';
import { getCars } from '../../shared/cars';
import './Dashboard.css';

interface DashboardStats {
  totalCars: number;
  totalUsers: number;
  totalBookings: number;
  monthlyBookings: number[];
  recentBookings: {
    id: string;
    user: string;
    car: string;
    date: string;
    status: string;
  }[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    totalUsers: 1,
    totalBookings: 100,
    monthlyBookings: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
    recentBookings: [
      {
        id: '1',
        user: 'John Doe',
        car: '2023 BMW X5',
        date: '2025-02-25',
        status: 'Pending'
      },
      {
        id: '2',
        user: 'Jane Smith',
        car: '2024 Mercedes GLC',
        date: '2025-02-24',
        status: 'Confirmed'
      },
      {
        id: '3',
        user: 'Mike Johnson',
        car: '2023 Audi Q7',
        date: '2025-02-24',
        status: 'Completed'
      }
    ]
  });

  useEffect(() => {
    const cars = getCars();
    setStats(prev => ({
      ...prev,
      totalCars: cars.length
    }));
  }, []);

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-content">
            <h3>Total Cars</h3>
            <p>{stats.totalCars}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h2>Monthly Bookings</h2>
          <div className="chart-placeholder">
            {/* Chart will be implemented with a charting library */}
            <div className="bar-chart">
              {stats.monthlyBookings.map((value, index) => (
                <div 
                  key={index} 
                  className="bar" 
                  style={{ height: `${value}%` }}
                  title={`Month ${index + 1}: ${value} bookings`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="recent-bookings">
        <h2>Recent Bookings</h2>
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Car</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.user}</td>
                  <td>{booking.car}</td>
                  <td>{booking.date}</td>
                  <td>
                    <span className={`status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
