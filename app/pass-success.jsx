import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";


const VerifyAccountScreen = () => {

const router = useRouter()


  return (
    <View style={styles.container}>
      <Image source={require("../assets/pass.png")} style={styles.image} />
      <Text style={styles.title}>Password Changed Successfully!</Text>

      <Text style={styles.subtitle}>
        You successfully changed the password use the new password to sign in
      </Text>
      <TouchableOpacity
          style={styles.button}
          onPress={handleSendAgain}
        >
          <Text style={styles.buttonText} onPress={()=>{router.push('sign-in')}}>Sign in </Text>
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
        textAlign:'center',
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
