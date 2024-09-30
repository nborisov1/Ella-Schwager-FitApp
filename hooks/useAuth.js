import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';  // Import your firebase config

export default function useAuth() {
  const [userData, setUserData] = useState(null); // State to store user data (including role)
  const [loading, setLoading] = useState(false); // Loading state for fetching user data

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true)
        try {
          // Fetch additional user data from Firestore using the user ID
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData({ uid: user.uid, ...userDoc.data() });  // Combine user UID with Firestore data
          } else {
            console.error('User document does not exist!');
            setUserData(null); // Clear user data if not found in Firestore
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null); // Clear user data on error
        }
      } else {
        setUserData(null);  // User is logged out, clear the state
      }
      setLoading(false); // Stop loading after user state is determined
    });

    return unsub; // Cleanup subscription on unmount
  }, []);

  return { userData, loading };
}
