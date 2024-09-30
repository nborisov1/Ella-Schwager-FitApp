import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';  // Firebase Auth import
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
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
      Alert.alert('Error', 'Please enter your email to reset the password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
    } catch (error) {
      console.error('Forgot Password Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../../assets/images/loginimg.png')} style={{ width: 220, height: 200 }} />
        </View>
      </SafeAreaView>

      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }} className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity className="flex items-end" onPress={handleForgotPassword}>
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 bg-blue-500 rounded-xl" onPress={handleLogin}>
            <Text className="text-xl font-bold text-center text-white">Login</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Gender')}>
            <Text className="font-semibold text-blue-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
