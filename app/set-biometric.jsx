import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import Toast from 'react-native-toast-message';

const BiometricsScreen = () => {
  const router = useRouter();

  const handleSetFaceID = () => {
    Toast.show({
      type: 'info',
      text1: 'Face ID Functionality',
      text2: 'Face ID setup is currently in progress.',
      visibilityTime: 3000,
    });
  };

  const handleSetFingerprint = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'This device does not support fingerprint authentication.',
        visibilityTime: 3000,
      });
      return;
    }

    if (!isEnrolled) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No fingerprints are enrolled on this device.',
        visibilityTime: 3000,
      });
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to proceed',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      router.push('welcome');
      Toast.show({
        type: 'success',
        text1: 'Authentication Successful',
        text2: 'You are logged in using your fingerprint.',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Authentication failed',
        text2: 'Please try again.',
        visibilityTime: 3000,
      });
    }
  };

  const handleSkip = () => {
    router.push('welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Set Biometrics</Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Set up biometrics for quick and secure login.</Text>
      
      <View style={styles.biometricOptions}>
        {/* Face ID Option */}
        <TouchableOpacity style={styles.biometricOption} onPress={handleSetFaceID}>
          <MaterialCommunityIcons name="face-recognition" size={30} color="#6982f8" />
          <Text style={styles.biometricText}>Set Face ID</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#7689b3" style={styles.iconRight} />
        </TouchableOpacity>
        
        {/* Fingerprint Option */}
        <TouchableOpacity style={styles.biometricOption} onPress={handleSetFingerprint}>
          <MaterialCommunityIcons name="fingerprint" size={30} color="#6982f8" />
          <Text style={styles.biometricText}>Set Fingerprint</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#6982f8" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: '23%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skipButton: {
    marginBottom: 10,
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'left',
    color: '#666',
  },
  biometricOptions: {
    width: '100%',
    marginTop: 20,
  },
  biometricOption: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  biometricText: {
    fontSize: 15,
    flex: 1,
    marginLeft: 15,
    color: '#333',
  },
  iconRight: {
    marginLeft: 'auto',
  },
});

export default BiometricsScreen;
