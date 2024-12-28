import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";


const VerifyAccountScreen = () => {


  const handleSendAgain = () => {
    console.log("Sending verification email again");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/vector.png")} style={styles.image} />
      <Text style={styles.title}>Email has been sent!</Text>

      <Text style={styles.subtitle}>
        Please check your email you should have received an otp
      </Text>
      <TouchableOpacity
          style={styles.button}
          onPress={()=>{router.push('otp-verify')}}
        >
          <Text style={styles.buttonText}>Enter the OTP</Text>
        </TouchableOpacity>
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
