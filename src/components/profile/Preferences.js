// src/components/profile/Preferences.js

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Preferences = () => {
  const { currentUser } = useContext(AuthContext);
  const [preferences, setPreferences] = useState(null);
  const [newPreference, setNewPreference] = useState('');

  useEffect(() => {
    const fetchPreferences = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setPreferences(userDoc.data().preferences);
      }
    };
    fetchPreferences();
  }, [currentUser]);

  const handleUpdatePreference = async () => {
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      preferences: [...preferences, newPreference]
    });
    setPreferences(prevPreferences => [...prevPreferences, newPreference]);
    setNewPreference('');
  };

  if (!preferences) return <p>טעינה...</p>;

  return (
    <div className="preferences">
      <h2>העדפות אישיות</h2>
      <ul>
        {preferences.map((pref, index) => (
          <li key={index}>{pref}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newPreference}
        onChange={(e) => setNewPreference(e.target.value)}
        placeholder="הוסף העדפה חדשה"
      />
      <button onClick={handleUpdatePreference}>עדכן העדפה</button>
    </div>
  );
};

export default Preferences;
