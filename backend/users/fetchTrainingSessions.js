import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

const fetchTrainingSessions = async () => {
  const trainingSessionsRef = collection(db, 'trainingSessions');
  const snapshot = await getDocs(trainingSessionsRef);
  const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return sessions;
};

export default fetchTrainingSessions;