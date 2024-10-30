import React, { useState } from 'react';
import { ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthForm from '../../AuthForm/AuthForm';

export default function AccountScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('שגיאה', 'אנא מלאו את כל הפרטים');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('שגיאה', 'הסיסמאות אינן תואמות');
      return;
    }

    // Handle sign-up logic here
    Alert.alert('Sign Up', 'Sign Up Successful!');
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/963697/pexels-photo-963697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
      style={{ flex: 1, justifyContent: 'center' }}
      imageStyle={{ opacity: 0.2 }}
    >
      <AuthForm
        fields={[
          { placeholder: 'שם מלא', value: fullName, onChangeText: setFullName },
          { placeholder: 'כתובת אימייל', value: email, onChangeText: setEmail },
          { placeholder: 'מספר טלפון', value: phone, onChangeText: setPhone },
          { placeholder: 'סיסמא', value: password, onChangeText: setPassword, secureTextEntry: true },
          { placeholder: 'אישור סיסמא', value: confirmPassword, onChangeText: setConfirmPassword, secureTextEntry: true }
        ]}
        buttonText="הירשם"
        onButtonPress={handleSignUp}
        onToggleAuthMode={() => navigation.navigate('Login')}
        authModeText="הרשמה למערכת"
      />
    </ImageBackground>
  );
}
