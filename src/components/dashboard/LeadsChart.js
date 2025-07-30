// src/components/dashboard/LeadsChart.js

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LeadsChart = ({ userId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'לידים יומיים',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  useEffect(() => {
    const fetchDailyRecords = async () => {
      const q = query(collection(db, 'dailyRecords'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map(doc => doc.data());
      
      const labels = records.map(record => new Date(record.date).toLocaleDateString());
      const data = records.map(record => record.leadsCompleted);

      setChartData({
        labels,
        datasets: [
          {
            label: 'לידים יומיים',
            data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    };

    fetchDailyRecords();
  }, [userId]);

  return (
    <div>
      <h2>תרשים ביצועי לידים</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LeadsChart;
