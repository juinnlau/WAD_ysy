import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground } from 'react-native'; // Import ImageBackground
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

// Function to validate email
export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
  return '';
}

// Function to validate password
export function passwordValidator(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 6) return 'Password must be at least 6 characters long.';
  return '';
}

const db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation: 1 });

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    // Validate email using the emailValidator function
    const emailError = emailValidator(email);
    if (emailError) {
      setErrorMessage(emailError);
      return; // Don't proceed with sign up if email is invalid
    }

    // Validate password using the passwordValidator function
    const passwordError = passwordValidator(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return; // Don't proceed with sign up if password is invalid
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (_, result) => {
          const { rows } = result;
          if (rows.length === 0) {
            // Email is not in use, proceed with sign up
            tx.executeSql(
              'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
              [username, email, password],
              (_, result) => {
                setErrorMessage('');
                // Navigate to the LoginScreen after successful sign up
                navigation.navigate('LoginScreen');
              },
              (error) => {
                console.error('Error during sign up:', error);
                setErrorMessage('An error occurred during sign up');
              }
            );
          } else {
            setErrorMessage('Email is already in use');
          }
        },
        (error) => {
          console.error('Error during SQL query:', error);
          setErrorMessage('An error occurred during sign up');
        }
      );
    });
  };

  return (
    <ImageBackground source={require('../images/wallpaper.jpg')} style={styles.wallpaper}>
      <View style={styles.container}>
        <Text style={styles.title}>User Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wallpaper: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignUpScreen;
