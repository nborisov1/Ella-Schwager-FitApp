import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Assuming your firebaseConfig.js exports 'db'
  
// Function to fetch user data along with their personal plan
const fetchUserData = async (userId) => {
  // Fetch the main user document from 'users' collection
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  let userData = null;
  let personalPlan = [];

  if (userDoc.exists()) {
    userData = userDoc.data(); // Get the user data
    console.log('User Data:', userData);
  } else {
    console.log('User does not exist.');
  }

  return {
    userData,
    personalPlan
  };
};

export default fetchUserData;
