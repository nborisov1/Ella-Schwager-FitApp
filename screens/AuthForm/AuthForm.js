// AuthForm.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function AuthForm({
  fields,
  buttonText,
  onButtonPress,
  onForgotPassword,
  onToggleAuthMode,
  authModeText
}) {
  return (
    <View style={{
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: 20,
      alignItems: 'center'
    }}>
      <FontAwesome name="apple" size={50} color="#FFD700" style={{ marginBottom: 20 }} />

      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#333333', marginBottom: 20 }}>
        {authModeText}
      </Text>

      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        {fields.map((field, index) => (
          <TextInput
            key={index}
            style={{
              padding: 15,
              backgroundColor: '#f5f5f5',
              borderRadius: 10,
              marginBottom: 10,
              textAlign: 'right',
              width: '100%',
              color: 'black',
            }}
            placeholder={field.placeholder}
            placeholderTextColor="gray"
            secureTextEntry={field.secureTextEntry}
            value={field.value}
            onChangeText={field.onChangeText}
          />
        ))}

        {onForgotPassword && (
          <TouchableOpacity style={{ alignItems: 'flex-end', marginBottom: 15, marginTop: 10 }} onPress={onForgotPassword}>
            <Text style={{ color: '#1e90ff' }}>שכחת סיסמא?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{ paddingVertical: 15, backgroundColor: '#E8C547', borderRadius: 25, marginTop: 10 }}
          onPress={onButtonPress}
        >
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'white' }}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: 'center', color: '#888888', marginVertical: 20 }}>או התחבר עם</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
            <FontAwesome5 name="google" size={30} color="red" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
            <FontAwesome5 name="facebook" size={30} color="#4267B2" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 15 }}>
            <FontAwesome name="apple" size={30} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={onToggleAuthMode}>
          <Text style={{ color: '#1e90ff', fontWeight: 'bold' }}>{authModeText === 'כניסה למערכת' ? ' הירשם' : ' התחבר'}</Text>
        </TouchableOpacity>
        <Text style={{ color: '#888888' }}>
          {authModeText === 'כניסה למערכת' ? 'אין לך חשבון?' : 'כבר יש לך חשבון?'}
        </Text>
      </View>
    </View>
  );
}