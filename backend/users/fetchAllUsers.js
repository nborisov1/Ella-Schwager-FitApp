import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';  // Import your Firestore config

// Function to fetch all users from Firestore
const fetchAllUsers = async () => {
  try {
    // Reference to the 'users' collection in Firestore
    const usersCollectionRef = collection(db, 'users');
    
    // Get all documents in the 'users' collection
    const querySnapshot = await getDocs(usersCollectionRef);

    // Map through each user document and check if they have a personalPlan subcollection
    const usersWithPlans = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const userData = doc.data();
        const userId = doc.id;

        // Check if the 'personalPlan' subcollection exists for this user by querying it
        const personalPlanRef = collection(db, `users/${userId}/personalPlan`);
        const personalPlanSnapshot = await getDocs(personalPlanRef);

        return {
          id: userId,
          ...userData,
          hasPersonalPlan: !personalPlanSnapshot.empty,  // If snapshot is not empty, subcollection exists
        };
      })
    );

    return usersWithPlans;  // Return the array of users with personal plan info
  } catch (error) {
    console.error('Error fetching users with personal plan:', error);
    throw error;
  }
};

export default fetchAllUsers;
