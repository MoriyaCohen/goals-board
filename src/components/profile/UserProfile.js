// src/components/profile/UserProfile.js

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };
    fetchUserData();
  }, [currentUser]);

  if (!userData) return <p>טעינה...</p>;

  return (
    <div className="user-profile">
      <h2>שלום {userData.displayName}</h2>
      <p><strong>דוא"ל:</strong> {userData.email}</p>
      <p><strong>תפקיד:</strong> {userData.role}</p>
      <p><strong>שעות עבודה:</strong> {userData.workingHours}</p>
      <p><strong>נקודות זיכוי:</strong> {userData.taxCredits}</p>
      <p><strong>ימי מחלה:</strong> {userData.sickDaysBalance}</p>
      <p><strong>ימי חופשה:</strong> {userData.vacationDaysBalance}</p>
      <p><strong>העדפות נושא:</strong> {userData.preferences.theme}</p>
    </div>
  );
};

export default UserProfile;
