import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";


const WelcomeScreen = () => {

  const router = useRouter();

  const handleSignInWithBiometrics = () => {
    router.push("sign-in"); 
  };

  const handleSignInWithPassword = () => {
    router.push("sign-in"); 
  };

  const handleSignUp = () => {
    router.push("sign-up"); 
  };

  return (
    <View style={styles.container}>


      <Image source={require("../assets/main.jpg")} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>DocuMed AI</Text>
        <Text style={styles.subtitle}>Lorem ipsum is a dummy text</Text>

        <TouchableOpacity onPress={handleSignInWithBiometrics} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign In with Biometrics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSignInWithPassword} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Sign In with Password</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don’t have an account?{" "}
          <Text style={styles.signupLink} onPress={handleSignUp}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
  registerText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "64%",
    resizeMode: "cover",
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    height: '40%', 
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 40,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: '#6982f8', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6982f8', 
  },
  secondaryButtonText: {
    color: '#6982f8', 
    fontSize: 16,
    fontWeight: '500',
  },
  signupText: {
    fontSize: 14,
    marginTop: 20,
    color: "#888",
  },
  signupLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
