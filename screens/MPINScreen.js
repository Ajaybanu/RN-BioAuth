import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function MPINScreen() {
  const navigation = useNavigation();

  const handleSetupComplete = () => {
    // Implement logic to set up MPIN
    // After setup, navigate back to login screen
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MPIN Setup Screen</Text>
      <TouchableOpacity onPress={handleSetupComplete}>
        <Text>Complete Setup</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})