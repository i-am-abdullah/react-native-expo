import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { z } from 'zod';
import { MaterialIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showSignUpText, setShowSignUpText] = useState(true);
  const router = useRouter()

  const handleLogin = () => {
    if (email === 'test@gmail.com' && password === 'test@123') {

      router.push('set-biometric')
      
    } else {
      Toast.show({
        type: 'error',
        text1: 'Wrong credentials',
      });
    }
  };

  const emailSchema = z.string().email({ message: 'Invalid email address' });
  const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long' });

  useEffect(() => {
    const isValidEmail = emailSchema.safeParse(email).success;
    const isValidPassword = passwordSchema.safeParse(password).success;
    setButtonDisabled(!(isValidEmail && isValidPassword));
  }, [email, password]);

  const validateEmail = () => {
    if (email && !emailSchema.safeParse(email).success) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password && !passwordSchema.safeParse(password).success) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowSignUpText(false);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowSignUpText(true);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Please sign in to backup your progress</Text>
        </View>

        <PaperTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={validateEmail}
          error={!!emailError}
          mode="outlined"
          outlineColor="#ccc" 

          style={styles.input}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.passwordContainer}>
          <PaperTextInput
            label="Password"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
            onBlur={validatePassword}
            error={!!passwordError}
            mode="outlined"
            outlineColor="#ccc" 
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <MaterialIcons
              name={secureTextEntry ? 'visibility-off' : 'visibility'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={()=>{router.push('reset-pass')}}
        >
          <Text style={styles.forgotPasswordText} onPress={()=>{router.push('reset-pass')}}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, buttonDisabled ? styles.disabledButton : styles.enabledButton]}
          onPress={handleLogin}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {showSignUpText && (
          <View style={styles.footerContainer}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupLink} onPress={()=>{router.push('sign-up')}}>Sign Up</Text>
            </Text>
          </View>
        )}

        <Toast /> 
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 140,
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffff',
    width: '100%',
    marginBottom: 15,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    top: 16,
  },
  button: {
    backgroundColor: '#6982f8',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  enabledButton: {
    backgroundColor: '#6982f8',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -5,
    marginBottom: 23,
  },
  forgotPasswordText: {
    color: '#007AFF',
  },
  signupText: {
    fontSize: 16,
    marginTop: 20,
  },
  signupLink: {
    color: '#007AFF',
  },
  errorText: {
    color: 'red',
    marginTop: -11,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SignInScreen;
