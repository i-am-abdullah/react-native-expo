import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";


const VerifyAccountScreen = () => {

const router = useRouter()
  const handleSendAgain = () => {
    router.push('email-sent')
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/vector.png")} style={styles.image} />
      <Text style={styles.title}>Email Successfully Verified!</Text>

      <Text style={styles.subtitle}>
        Your email has been verified Successfully. You can now proceed with full access to your account and features.
      </Text>
      <TouchableOpacity
          style={styles.button}
          onPress={handleSendAgain}
        >
          <Text style={styles.buttonText} onPress={()=>{router.push('set-biometric')}}>Continue</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding:20
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
      button: {
       
        marginTop:10,
        backgroundColor: '#6982f8',
        padding: 11,
        borderRadius: 5,
        width: '80%',
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },

});

export default VerifyAccountScreen;
