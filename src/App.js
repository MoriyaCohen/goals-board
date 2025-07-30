// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, rtl } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { heIL } from '@mui/material/locale';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// Dashboard Components
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

// Profile Components
import UserProfile from './components/profile/UserProfile';
import MonthlyPlan from './components/profile/MonthlyPlan';
import Preferences from './components/profile/Preferences';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// יצירת ערכת נושא (Theme) בעברית ומותאמת מימין לשמאל
const theme = createTheme({
  direction: 'rtl', // כיוון מימין לשמאל
  typography: {
    fontFamily: [
      'Rubik',
      'Assistant',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
}, heIL); // שימוש בלוקליזציה עברית

// Private Route - רכיב המגן על דפים שדורשים התחברות
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route - רכיב המגן על דפי המנהל
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user && user.role === 'admin';
  return isAdmin ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div dir="rtl">
        <AuthProvider>
          <DataProvider>
            <Router>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* User Dashboard */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                } />
                
                {/* Admin Dashboard */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                
                {/* Profile Routes */}
                <Route path="/profile" element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                } />
                <Route path="/monthly-plan" element={
                  <PrivateRoute>
                    <MonthlyPlan />
                  </PrivateRoute>
                } />
                <Route path="/preferences" element={
                  <PrivateRoute>
                    <Preferences />
                  </PrivateRoute>
                } />
                
                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            </Router>
          </DataProvider>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;