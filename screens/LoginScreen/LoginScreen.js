import React, { useState } from 'react';
import { ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthForm from '../AuthForm/AuthForm';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('שגיאה', 'אנא מלאו את כל הפרטים');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login Error:', error.message);
      Alert.alert('Login Error', error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('שגיאה', 'בשביל לאפס את הסיסמא הכנסי את האימייל שלך');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('בוצע', 'נשלח לך אימייל לאיפוס סיסמא');
    } catch (error) {
      console.error('Forgot Password Error:', error.message);
      Alert.alert('שגיאה!', error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/963697/pexels-photo-963697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
      style={{ flex: 1, justifyContent: 'center' }}
      imageStyle={{ opacity: 0.2 }}
    >
      <AuthForm
        fields={[
          { placeholder: 'כתובת אימייל', value: email, onChangeText: setEmail },
          { placeholder: 'סיסמא', value: password, onChangeText: setPassword, secureTextEntry: true }
        ]}
        buttonText="התחבר"
        onButtonPress={handleLogin}
        onForgotPassword={handleForgotPassword}
        onToggleAuthMode={() => navigation.navigate('Gender')}
        authModeText="כניסה למערכת"
      />
    </ImageBackground>
  );
}
