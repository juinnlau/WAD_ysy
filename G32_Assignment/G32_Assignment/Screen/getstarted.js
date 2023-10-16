import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  // Function to handle the "Get Started" button press
  const handleGetStartedPress = () => {
    
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('../images/applogo.png')} style={styles.logo} />

      
      <TouchableOpacity style={styles.bottomTab} onPress={handleGetStartedPress}>
        <Text style={styles.tabText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 50,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black', 
    padding: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
  },
});

export default GetStarted;
