import React, { useState } from 'react';
import { ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthForm from '../../AuthForm/AuthForm';
import signUp from '../../../backend/users/signUp'

const AccountScreen = ({ navigation, route }) => {
  const [phone, setPhone] = useState(''); // Initialize height input as an empty string
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmedPassword, setConfirmedPassword] = useState(''); 
  const [fullName, setFullName] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  // State to track password visibility
  const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] = useState(false);  // State to track password visibility

  const { signUpData } = route.params;
  console.log(signUpData);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);  // Toggle password visibility state
  };

  const toggleConfirmedPasswordVisibility = () => {
    setIsConfirmedPasswordVisible(!isConfirmedPasswordVisible);  // Toggle password visibility state
  };

  const handleSignUp = async ()=>{
      setErrorMessage('');

      // Validate fields
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
              const updatedData = { ...signUpData, name: fullName }; // Add selected age to sign-up data
              await signUp(email, password, updatedData)
          }catch(err){
              setErrorMessage(err.message)
              console.error(err)
          }
      }
  }
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
          { placeholder: 'אישור סיסמא', value: confirmedPassword, onChangeText: setConfirmedPassword, secureTextEntry: true }
        ]}
        buttonText="הירשם"
        onButtonPress={handleSignUp}
        onToggleAuthMode={() => navigation.navigate('Login')}
        authModeText="הרשמה למערכת"
      />
    </ImageBackground>
  );
}

export default AccountScreen;