import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import signUp from '../../../backend/users/signUp';


const AccountScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmedPassword, setConfirmedPassword] = useState(''); 
  const [fullName, setFullName] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  // State to track password visibility
  const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] = useState(false);  // State to track password visibility

  const { signUpData } = route.params;

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
              await signUp(email, password, signUpData)
          }catch(err){
              setErrorMessage(err.message)
              console.error(err)
          }
      }
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Create your Account</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor="#aaa"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>


        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <FontAwesome name={isPasswordVisible ? "eye" : "eye-slash"} size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa" 
            value={confirmedPassword}
            onChangeText={setConfirmedPassword}
            secureTextEntry={!isConfirmedPasswordVisible}
          />
          <TouchableOpacity onPress={toggleConfirmedPasswordVisibility}>
            <FontAwesome name={isConfirmedPasswordVisible ? "eye" : "eye-slash"} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        {errorMessage ? (<Text className="text-red-500 font-semibold text-center">{errorMessage}</Text>) : null}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Or continue with */}
        <Text style={styles.orText}>or continue with</Text>

        {/* Social Login Options */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Already have an account */}
        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signinLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
