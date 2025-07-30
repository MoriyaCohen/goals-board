// src/components/layout/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">דשבורד</Link>
          </li>
          <li>
            <Link to="/profile">פרופיל</Link>
          </li>
          <li>
            <Link to="/daily-view">הישגים יומיים</Link>
          </li>
          <li>
            <Link to="/monthly-view">הישגים חודשיים</Link>
          </li>
          <li>
            <Link to="/notifications">התראות</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
