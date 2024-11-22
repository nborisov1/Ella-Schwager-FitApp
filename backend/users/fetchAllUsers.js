import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';  // Import your Firestore config

// Function to fetch all users from Firestore where 'role' is missing, null, or empty
const fetchAllUsers = async () => {
  try {
    // Reference to the 'users' collection in Firestore
    const usersCollectionRef = collection(db, 'users');
    
    // Get all documents in the 'users' collection
    const querySnapshot = await getDocs(usersCollectionRef);

    // Map through each user document and check for missing/empty 'role' and personalPlan subcollection
    const usersWithPlans = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const userData = doc.data();
        const userId = doc.id;

        // Filter out users with a defined role field (not empty or null)
        if (!userData.role || userData.role === '') {
          // Check if the 'personalPlan' subcollection exists for this user by querying it
          const personalPlanRef = collection(db, `users/${userId}/personalPlan`);
          const personalPlanSnapshot = await getDocs(personalPlanRef);

          return {
            id: userId,
            ...userData,
            hasPersonalPlan: !personalPlanSnapshot.empty,  // If snapshot is not empty, subcollection exists
          };
        }
        return null;  // Return null if the role is defined
      })
    );

    // Filter out any null values from the resulting array
    return usersWithPlans.filter(user => user !== null);  

  } catch (error) {
    console.error('Error fetching users with personal plan:', error);
    throw error;
  }
};

export default fetchAllUsers;
