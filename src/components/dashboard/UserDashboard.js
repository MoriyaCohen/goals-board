import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';
import { LeadsChart } from '../dashboard/LeadsChart';
import { SalaryCalculation } from '../dashboard/SalaryCalculation';
import { DailyView } from '../dashboard/DailyView';
import { MonthlyView } from '../dashboard/MonthlyView';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Footer } from '../layout/Footer';

const UserDashboard = () => {
  const { userData } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Handle if the user is not logged in
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
        <h1>Welcome, {userData.name}!</h1>
        <section className="dashboard-section">
          <div className="dashboard-summary">
            <h2>Your Performance Summary</h2>
            {/* Add any additional summary or data here */}
          </div>
          <div className="dashboard-charts">
            <LeadsChart />
            <SalaryCalculation />
          </div>
          <div className="dashboard-views">
            <DailyView />
            <MonthlyView />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
