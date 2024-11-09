import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
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

  if (currentLikedSessions.includes(sessionId)) {
    // Remove sessionId from likedSessions
    await updateDoc(userDocRef, {
      likedSessions: arrayRemove(sessionId),
    });
    return currentLikedSessions.filter(id => id !== sessionId);
  } else {
    // Add sessionId to likedSessions
    await updateDoc(userDocRef, {
      likedSessions: arrayUnion(sessionId),
    });
    return [...currentLikedSessions, sessionId];
  }
};