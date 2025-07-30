// src/components/layout/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header>
      <div className="logo">
        <h1>לוח סטטיסטיקת הישגים</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">דשבורד</Link>
          </li>
          <li>
            <Link to="/profile">פרופיל</Link>
          </li>
          {currentUser && (
            <li>
              <button onClick={logout}>התנתק</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
