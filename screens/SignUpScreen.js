import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name,setName] = useState ('');
    const [email,setEmail] = useState ('');
    const [password,setPassword] = useState ('');
    const [confirmedPassword,setCconfirmedPassword] = useState ('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async ()=>{
        setErrorMessage('');

        // Validate fields
        if (!name || !email || !password || !confirmedPassword) {
            setErrorMessage('Please fill out all fields');
            return;
        }

        if (password !== confirmedPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (email && password){
            try{
                await createUserWithEmailAndPassword(auth,email,password)
            }catch(err){
                setErrorMessage(err.message)
            }
        }
    }
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4" >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Image source={require('../assets/images/signupimg.png')} 
                style={{width: 325, height: 110}} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} >
        <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={name}
                onChangeText={value => setName(value)}
                placeholder='Enter Name'
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={value => setEmail(value)}
                placeholder='Enter Email'
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={password}
                onChangeText={value => setPassword(value)}
                placeholder='Enter Password'
            />
            <Text className="text-gray-700 ml-4">Confirm Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                value={confirmedPassword}
                onChangeText={value => setCconfirmedPassword(value)}
                placeholder='Confirm Password'
            />
            {errorMessage ? (<Text className="text-red-500 font-semibold text-center">{errorMessage}</Text>) : null}
            <TouchableOpacity
                className="py-3 bg-blue-500 rounded-xl"
                onPress = {handleSubmit}
            >
                <Text className="font-xl font-bold text-center text-white">
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-blue-500"> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
