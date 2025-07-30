import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import { LeadsChart } from './LeadsChart';
import { SalaryCalculation } from './SalaryCalculation';
import { DailyView } from './DailyView';
import { MonthlyView } from './MonthlyView';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Footer } from '../layout/Footer';

const AdminDashboard = () => {
  const { userData } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      // Handle if the user is not an admin or not logged in
      window.location.href = '/login';
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <h1>Welcome, Admin {userData.name}!</h1>
        <section className="dashboard-section">
          <div className="dashboard-summary">
            <h2>System Overview</h2>
            {/* Summary of the system: total users, total earnings, etc. */}
          </div>
          <div className="dashboard-charts">
            <LeadsChart />
            <SalaryCalculation />
          </div>
          <div className="dashboard-views">
            <DailyView />
            <MonthlyView />
          </div>
          <div className="user-management">
            <h2>User Management</h2>
            {/* Table or components to list and manage users */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
