import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


const VerifyAccountScreen = () => {

const router = useRouter()
  const handleSendAgain = () => {
    router.push('email-sent')
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/vector.png")} style={styles.image} />
      <Text style={styles.title}>Verify Your Account!</Text>

      <Text style={styles.subtitle}>
        A verification link has been sent to your email
        Please click the link to confirm and activate your account.
      </Text>
      <View style={styles.footer}>
      <TouchableOpacity onPress={handleSendAgain}>

        <Text style={styles.footerText}>         

          Didn't receive the email? Check the spam folder or {" "}
            <Text style={styles.linkText}>Send Again</Text>
        </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      },
      image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        marginTop: '35%',
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
      },
      footer: {
        position: "absolute", 
        bottom: 20, 
        left: 0,
        right: 0,
        alignItems: "center",
        textAlign:'center'
      },
      footerText: {
        padding:20,
        fontSize: 14,
        textAlign:'center',
        
      },
      linkText: {
        color: "#6982f8"
      }
});

export default VerifyAccountScreen;
