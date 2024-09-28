import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, setDoc } from './config/firebase';

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
  
const handleSignUp = async ()=> {
    setErrorMessage('');

    if (!fullName || !email || !password || !confirmedPassword) {
        setErrorMessage('Please fill out all fields');
        return;
    }

    if (password !== confirmedPassword) {
        setErrorMessage('Passwords do not match');
        return;
    }

    if (email && password){
        try{
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)
            await createUser(userCredential.user.uid, email, signUpData)
        }catch(err){
            setErrorMessage(err.message)
            console.error(err)
        }
    }
}
