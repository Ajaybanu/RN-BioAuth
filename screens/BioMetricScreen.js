import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { StatusBar } from "expo-status-bar";

const BioMetricScreen = () => {
  const navigation = useNavigation();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  // face and fingerprint scan
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentiction");
  };

  const alerComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const TwoButtonAlert = () =>
    Alert.alert("Welcome to App", "Subscribe now", [
      {
        text: "Back",
        onPress: () => console.log("Cancel press"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
  const handleBIometricAuth = async () => {
    // checking hardware support biometric
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    //fall back in default authentication method (password) if biometric is not available
    if (!isBiometricAvailable)
      return alerComponent(
        "please enter your password",
        "Biometric Auth not Supported",
        "OK",
        () => fallBackToDefaultAuth()
      );
    // check biometric types avilable(fingerprint,facial recongnition)
    let supportBiometrics;
    if (isBiometricAvailable)
      supportBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    // check biometrics are saved locally in users device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alerComponent(
        "Biometric record not found",
        "Please Login with password ",
        "OK",
        navigation.navigate("Login")
       
      );

    //authenticate with biometric
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biomerics",
      cancelLabel: "cancel",
      disableDeviceFallback: true,
    });

    //Log the user in on success
    if (biometricAuth) {
      TwoButtonAlert();
    }
    console.log({ isBiometricAvailable });
    console.log({ supportBiometrics });
    console.log({ savedBiometrics });
    console.log({ biometricAuth });
  };
 

  const handleSetupComplete = () => {
    // Implement logic to set up biometric authentication
    // After setup, navigate back to login screen
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>
          {isBiometricSupported
            ? "Your Device is Compatible with Biometrics"
            : "face or Fingerprint scanner is availabel on the device"}
        </Text>
        <TouchableHighlight style={{height:60,marginTop:200}}>
          <Button title="Login with BIometrics"
          color="black"
          onPress={handleBIometricAuth} 
          />
           </TouchableHighlight>
           <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default BioMetricScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
   paddingTop:StatusBar.currentHeight
  }
});
