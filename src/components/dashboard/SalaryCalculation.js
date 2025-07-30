// src/components/dashboard/SalaryCalculation.js

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const SalaryCalculation = ({ userId, hourlyRate, overtimeRate }) => {
  const [totalSalary, setTotalSalary] = useState(0);
  const [overtimeMinutes, setOvertimeMinutes] = useState(0);

  useEffect(() => {
    const fetchDailyRecords = async () => {
      const q = query(collection(db, 'dailyRecords'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map(doc => doc.data());
      
      let regularHours = 0;
      let overtime = 0;

      records.forEach(record => {
        const entryTime = new Date(`1970-01-01T${record.entryTime}:00`);
        const exitTime = new Date(`1970-01-01T${record.exitTime}:00`);
        const workedHours = (exitTime - entryTime) / 1000 / 60 / 60; // hours worked

        regularHours += workedHours > 8 ? 8 : workedHours;
        overtime += workedHours > 8 ? workedHours - 8 : 0;
      });

      const totalRegularPay = regularHours * hourlyRate;
      const totalOvertimePay = overtime * overtimeRate;
      const totalBonus = records.reduce((acc, record) => acc + record.bonusAmount, 0);

      setTotalSalary(totalRegularPay + totalOvertimePay + totalBonus);
      setOvertimeMinutes(overtime * 60); // convert overtime hours to minutes
    };

    fetchDailyRecords();
  }, [userId, hourlyRate, overtimeRate]);

  return (
    <div>
      <h2>חישוב משכורת</h2>
      <p>שכר רגיל: ₪{totalSalary.toFixed(2)}</p>
      <p>שעות נוספות: {overtimeMinutes} דקות</p>
      <p>סך הכל משכורת: ₪{totalSalary.toFixed(2)}</p>
    </div>
  );
};

export default SalaryCalculation;
