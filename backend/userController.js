import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getUserLikedSessions = async (userId) => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);
  console.log(userDoc);
  if (userDoc.exists()) {
    return userDoc.data().likedSessions || [];
  } else {
    console.error("No such user document!");
    return [];
  }
};

export const toggleLikeSession = async (userId, sessionId, currentLikedSessions) => {
  const userDocRef = doc(db, 'users', userId);
  const sessionDocRef = doc(db, 'generalWorkouts', sessionId);

  if (currentLikedSessions.includes(sessionId)) {
    // Remove sessionId from likedSessions and decrement score
    await updateDoc(userDocRef, {
      likedSessions: arrayRemove(sessionId),
    });
    await updateDoc(sessionDocRef, {
      score: increment(-1),
    });
    return currentLikedSessions.filter(id => id !== sessionId);
  } else {
    // Add sessionId to likedSessions and increment score
    await updateDoc(userDocRef, {
      likedSessions: arrayUnion(sessionId),
    });
    await updateDoc(sessionDocRef, {
      score: increment(1),
    });
    return [...currentLikedSessions, sessionId];
  }
};
