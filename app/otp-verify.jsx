import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

const OTPScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const hardcodedOTP = ['1', '2', '3', '4']; 

  const inputRefs = useRef([]); 

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      handleVerifyOTP(); 
    }
  }, [otp]);

  const handleVerifyOTP = () => {
    if (otp.join('') === hardcodedOTP.join('')) {
      navigation.navigate('create-pass');
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const handleOTPChange = (text, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOtp(updatedOTP);
    setErrorMessage(''); 

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Please enter the OTP you've received on the email.</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)} 
            ref={(input) => (inputRefs.current[index] = input)} 
          />
        ))}
      </View>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop:'27%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default OTPScreen;
