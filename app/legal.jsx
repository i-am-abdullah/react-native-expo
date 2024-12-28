import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Checkbox } from 'react-native-paper';

const LegalScreen = () => {
  const router = useRouter();

  const [termsAndConditionsAgreed, setTermsAndConditionsAgreed] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [baaAgreed, setBaaAgreed] = useState(false);

  const isAcceptButtonEnabled = termsAndConditionsAgreed && privacyPolicyAgreed && baaAgreed;

  const handleAccept = () => {
    if (isAcceptButtonEnabled) {

    router.push('verified')
           
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Terms</Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Use License</Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.checkboxes}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={termsAndConditionsAgreed ? 'checked' : 'unchecked'}
              onPress={() => setTermsAndConditionsAgreed(!termsAndConditionsAgreed)}
               color='#7689b3'
            />
            <Text style={styles.checkboxText}>I agree with the Terms and Conditions</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={privacyPolicyAgreed ? 'checked' : 'unchecked'}
              onPress={() => setPrivacyPolicyAgreed(!privacyPolicyAgreed)}
               color='#7689b3'
            />
            <Text style={styles.checkboxText}>I agree with the Privacy Policy</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={baaAgreed ? 'checked' : 'unchecked'}
              onPress={() => setBaaAgreed(!baaAgreed)}
              color='#7689b3'
            />
            <Text style={styles.checkboxText}>I agree with the BAA</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.acceptButton,
            !isAcceptButtonEnabled && styles.acceptButtonDisabled,
          ]}
          onPress={handleAccept}
          disabled={!isAcceptButtonEnabled}
        >
          <Text style={styles.acceptButtonText} >Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff', 
    padding: 20,
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
    marginBottom: 20,
  },
  divider: {
    borderBottomColor: '#ccc', 
    borderBottomWidth: 1,
    width: '75%', 
    alignSelf: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#6982f8', 
    marginBottom: 10,
    textAlign: 'left', 
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  checkboxes: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
  },
  acceptButton: {
    backgroundColor: '#6982f8',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  acceptButtonDisabled: {
    backgroundColor: '#B0C4DE', 
  },
  acceptButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default LegalScreen;
