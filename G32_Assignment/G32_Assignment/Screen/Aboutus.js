import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import tiktokIcon from '../images/tiktok.png';
import whatsappIcon from '../images/whatsapp.png';
import facebookIcon from '../images/facebook.png';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../images/applogo.png')} style={styles.logo} />
      <Text style={styles.heading}>About Our App</Text>
      <Text style={styles.description}>
        Welcome to our app! We are continuously working to bring you new features and improvements.
      </Text>
      <Text style={styles.contactHeading}>Contact Us:</Text>
      <View style={styles.contactContainer}>
        <TouchableOpacity >
          <Image source={tiktokIcon} style={styles.contactIcon} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={whatsappIcon} style={styles.contactIcon} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={facebookIcon} style={styles.contactIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contactHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  contactIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});

export default AboutUs;
