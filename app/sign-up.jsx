import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { z } from 'zod';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SignUpScreen = ({route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upperCase: false,
    specialOrNumber: false,
  });
  const [showSignInText, setShowSignInText] = useState(true);
const router = useRouter()
  const handleSignUp = () => {
router.push('legal')
  };


  const emailSchema = z.string().email({ message: 'Invalid email address' });
  const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long' });

  useEffect(() => {
    const isValidEmail = emailSchema.safeParse(email).success;
    const isValidPassword = passwordSchema.safeParse(password).success;
    const isConfirmPasswordValid = password === confirmPassword;

    setButtonDisabled(!(isValidEmail && isValidPassword && isConfirmPasswordValid));
  }, [email, password, confirmPassword]);

  const validateEmail = () => {
    if (email && !emailSchema.safeParse(email).success) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const lengthCheck = password.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password);
    const specialOrNumberCheck = /[0-9!@#$%^&*]/.test(password);

    setPasswordChecks({
      length: lengthCheck,
      upperCase: upperCaseCheck,
      specialOrNumber: specialOrNumberCheck,
    });

    if (!lengthCheck) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!upperCaseCheck) {
      setPasswordError('Password must have at least one uppercase letter');
    } else if (!specialOrNumberCheck) {
      setPasswordError('Password must have at least one number or special character');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowSignInText(false);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowSignInText(true);
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
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Please fill in the details to sign up</Text>
        </View>

        <PaperTextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          outlineColor="#ccc" 
           
          style={styles.input}
        />

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
            onChangeText={(text) => {
              setPassword(text);
              validatePassword();
            }}
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

      {password.length > 0 && (
  <View style={styles.checkContainer}>
    <View style={styles.checkRow}>
      {passwordChecks.length ? (
        <MaterialIcons name="check-circle-outline" size={17} color="green" />
      ) : (
        <MaterialIcons name="highlight-off" size={17} color="red" />
      )}
      <Text style={[styles.checkText, passwordChecks.length ? styles.checkValid : styles.checkInvalid]}>
        At least 8 characters
      </Text>
    </View>
    <View style={styles.checkRow}>
      {passwordChecks.upperCase ? (
        <MaterialIcons name="check-circle-outline" size={17} color="green" />
      ) : (
        <MaterialIcons name="highlight-off" size={17} color="red" />
      )}
      <Text style={[styles.checkText, passwordChecks.upperCase ? styles.checkValid : styles.checkInvalid]}>
        At least one uppercase letter
      </Text>
    </View>
    <View style={styles.checkRow}>
      {passwordChecks.specialOrNumber ? (
        <MaterialIcons name="check-circle-outline" size={17} color="green" />
      ) : (
        <MaterialIcons name="highlight-off" size={17} color="red" />
      )}
      <Text style={[styles.checkText, passwordChecks.specialOrNumber ? styles.checkValid : styles.checkInvalid]}>
        At least one number or special character
      </Text>
    </View>
  </View>
)}

        <PaperTextInput
          label="Confirm Password"
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={validateConfirmPassword}
          error={!!confirmPasswordError}
          mode="outlined"
          outlineColor="#ccc" 
          style={styles.input}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, buttonDisabled ? styles.disabledButton : styles.enabledButton]}
          onPress={handleSignUp}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>

        {showSignInText && ( 
          <View style={styles.footerContainer}>
            <Text style={styles.signupText}>
              Already have an account? <Text style={styles.signupLink} onPress={()=>{router.push('sign-in')}}>Sign In</Text>
            </Text>
          </View>
        )}
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
    paddingTop:83,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
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
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',  
    marginBottom: 5, 
  },
  button: {
    marginTop:10,
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
  checkContainer: {
    marginTop:-7,
    marginBottom: 10,
    width: '100%',
  },
  checkText: {
    fontSize: 14,
    marginLeft: 5
  },
  checkValid: {
    color: 'green',
  },
  checkInvalid: {
    color: 'red',
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
  signupText: {
    fontSize: 16,
    marginTop: 20,
  },
  signupLink: {
    color: '#007AFF',
  },
});

export default SignUpScreen;
