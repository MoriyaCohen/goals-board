// src/components/dashboard/MonthlyView.js

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const MonthlyView = ({ userId }) => {
  const [monthlyPlan, setMonthlyPlan] = useState(null);

  useEffect(() => {
    const fetchMonthlyPlan = async () => {
      const q = query(collection(db, 'monthlyPlans'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const plan = querySnapshot.docs.map(doc => doc.data())[0];
      setMonthlyPlan(plan);
    };

    fetchMonthlyPlan();
  }, [userId]);

  if (!monthlyPlan) return <p>טוען תוכנית חודשית...</p>;

  return (
    <div>
      <h2>תוכנית חודשית</h2>
      <p><strong>יעד לידים יומי:</strong> {monthlyPlan.dailyLeadsTarget}</p>
      <p><strong>שעות נוספות בשבוע:</strong> {monthlyPlan.overtimeHoursPerWeek} שעות</p>
      <p><strong>ימים עם שעות נוספות בשבוע:</strong> {monthlyPlan.overtimeDaysPerWeek} ימים</p>
      <p><strong>משפט מוטיבציה:</strong> {monthlyPlan.motivationalPhrase}</p>
    </div>
  );
};

export default MonthlyView;
