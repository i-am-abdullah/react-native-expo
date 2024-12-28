import { Stack } from 'expo-router';
import {  Provider as PaperProvider, DefaultTheme  } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6982f8', 
    background: '#ffffff', 
    surface: '#ffffff',
    text: '#000000', 
    placeholder: 'gray', 
  },
};

const Layout = () => {
  return (
    <PaperProvider theme={theme}>

    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="verify-account" options={{ headerShown: false }} />
      <Stack.Screen name="verified" options={{ headerShown: false }} />
      <Stack.Screen name="set-biometric" options={{ headerShown: false }} />
      <Stack.Screen name="otp-verify" options={{ headerShown: false }} />
      <Stack.Screen name="create-pass" options={{ headerShown: false }} />
      <Stack.Screen name="pass-success" options={{ headerShown: false }} />
      <Stack.Screen name="email-sent" options={{ headerShown: false }} />
      <Stack.Screen name="reset-pass" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="legal" options={{ headerShown: true,     
      headerStyle: {
      backgroundColor: '#f7f8ff', 
      height: 60, 
    }
     }} />
    </Stack>
    </PaperProvider>
  );
};

export default Layout;
