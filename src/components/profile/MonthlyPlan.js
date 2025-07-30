// src/components/profile/MonthlyPlan.js

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const MonthlyPlan = () => {
  const { currentUser } = useContext(AuthContext);
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const monthlyDoc = await getDoc(doc(db, 'monthlyPlans', currentUser.uid));
      if (monthlyDoc.exists()) {
        setMonthlyData(monthlyDoc.data());
      }
    };
    fetchMonthlyData();
  }, [currentUser]);

  if (!monthlyData) return <p>טעינה...</p>;

  return (
    <div className="monthly-plan">
      <h2>תכנית חודשית</h2>
      <p><strong>שעות עבודה מצטברות:</strong> {monthlyData.totalHours}</p>
      <p><strong>היעדים שהושגו:</strong> {monthlyData.goalsAchieved}</p>
      <p><strong>הערכת ביצועים:</strong> {monthlyData.performanceReview}</p>
    </div>
  );
};

export default MonthlyPlan;
