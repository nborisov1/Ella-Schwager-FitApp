import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, setDoc } from '../../config/firebase';

const createUser = async (uid, email, signUpData) => {
    return await setDoc(doc(db, 'users', uid), {
      age: signUpData.age,
      gender: signUpData.gender,
      weight: signUpData.weight,
      height: signUpData.height,
      goals: signUpData.goals,
      activityLevel: signUpData.activityLevel,
      email: email
    });
   }
  
async function signUp(email, password, signUpData) {
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    await createUser(userCredential.user.uid, email, signUpData)
    return userCredential.user
}

export default signUp;