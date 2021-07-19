import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from './config/firebase';
import { Register } from './components/Register/Register';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to PickUp</Text>
      <Register />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
