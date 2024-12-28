import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const emailSchema = z.string().email({ message: 'Invalid email address' });

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  const handleSendInstructions = () => {
    const validationResult = emailSchema.safeParse(email);
    if (validationResult.success) {

      router.push('email-sent'); 
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid email',
      });
    }
  };

  const validateEmail = (input) => {
    setEmail(input);
    const isValidEmail = emailSchema.safeParse(input).success;
    setEmailError(isValidEmail ? '' : 'Invalid email address');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="chevron-left" size={25} color="#000" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter the email associated with your account and we'll send an email with instructions to reset your password.
        </Text>

        <PaperTextInput
          label="Email"
          value={email}
          onChangeText={validateEmail} 
          error={!!emailError}
          mode="outlined"
          style={styles.input}
          outlineColor="#ccc" 
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, styles.enabledButton]} 
          onPress={handleSendInstructions} 
        >
          <Text style={styles.buttonText}>Send Instructions</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 30,
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: -17,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#6982f8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ResetPasswordScreen;
