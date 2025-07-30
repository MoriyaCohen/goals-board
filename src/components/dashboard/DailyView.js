// src/components/dashboard/DailyView.js

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const DailyView = ({ userId }) => {
  const [dailyRecords, setDailyRecords] = useState([]);
  
  useEffect(() => {
    const fetchDailyRecords = async () => {
      const q = query(collection(db, 'dailyRecords'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map(doc => doc.data());
      setDailyRecords(records);
    };
    
    fetchDailyRecords();
  }, [userId]);

  return (
    <div>
      <h2>רשומות יומיות</h2>
      <table>
        <thead>
          <tr>
            <th>תאריך</th>
            <th>שעת כניסה</th>
            <th>שעת יציאה</th>
            <th>לידים שנעשו</th>
            <th>שעות נוספות</th>
          </tr>
        </thead>
        <tbody>
          {dailyRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.entryTime}</td>
              <td>{record.exitTime}</td>
              <td>{record.leadsCompleted}</td>
              <td>{record.overtimeMinutes / 60} שעות</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyView;
