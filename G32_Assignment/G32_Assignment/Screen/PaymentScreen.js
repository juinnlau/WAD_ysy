import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertBookingHistory } from '../Database/Historydb';

const PaymentScreen = ({ route, navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // Initialize total amount
  const [isCardValid, setIsCardValid] = useState(true); // Card validation state
  const [isFormValid, setIsFormValid] = useState(false); // Form validation state
  const [userEmail, setUserEmail] = useState(''); // User's email state
  const { params } = route;

  useEffect(() => {
    console.log('Received User Email:', userEmail);
    console.log('Received Movie Name:', params?.movieName);
    console.log('Received Date:', params?.selectedDate);
    console.log('Received Showtime:', params?.selectedShowtime);
    console.log('Seat Booked:', params?.bookedSeats?.join(', '));

    // Calculate total amount based on the number of selected seats
    const seatPrice = 15; // Price per seat
    const numberOfSeats = params?.bookedSeats?.length || 0;
    const calculatedTotalAmount = seatPrice * numberOfSeats;
    setTotalAmount(calculatedTotalAmount);
  }, [params, userEmail]);

  useEffect(() => {
    // Retrieve the user's email from AsyncStorage
    AsyncStorage.getItem('userData')
      .then((data) => {
        if (data) {
          const userData = JSON.parse(data);
          const userEmail = userData.email;
          setUserEmail(userEmail); 
          console.log('User Email:', userEmail);
        } else {
          // Handle the case when no user data is found
        }
      })
      .catch((error) => {
        console.error('Error reading user data from AsyncStorage:', error);
      });
  }, []);

  // Function to validate the form
  const validateForm = () => {
    return cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3;
  };

  // Update the form validation state whenever any input changes
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [cardNumber, expiryDate, cvv]);

  const handleCardNumberChange = (text) => {
    // Remove any non-numeric characters from the input
    const cleanedInput = text.replace(/[^0-9]/g, '');

    // Limit card number to 16 digits
    const truncatedInput = cleanedInput.slice(0, 16);

    // Update card number state
    setCardNumber(truncatedInput);

    // Check if the card number is less than 16 digits
    if (truncatedInput.length < 16) {
      setIsCardValid(false);
    } else {
      setIsCardValid(true);
    }

    console.log('Card Number:', truncatedInput); // Log the card number
  };

  const handleExpiryDateChange = (text) => {
    // Remove any non-numeric characters from the input
    const cleanedText = text.replace(/[^0-9]/g, '');

    if (cleanedText.length === 4) {
      // If the input has exactly 4 digits, split it into month and year
      const month = cleanedText.substring(0, 2);
      const year = cleanedText.substring(2, 4);

      // Check if the month is valid (01-12) and the year is valid (23-35)
      if (/^(0[1-9]|1[0-2])$/.test(month) && /^(23|24|25|26|27|28|29|30|31|32|33|34|35)$/.test(year)) {
        // Input is valid, format it as MM/YY
        setExpiryDate(`${month}/${year}`);
      } else {
        // Invalid month or year, clear the input
        setExpiryDate('');
        Alert.alert('Invalid Expiry Date', 'Please enter a valid Expiry Date (MMYY)');
      }
    } else {
      // Input is not yet complete, set it as is
      setExpiryDate(cleanedText);
    }
    console.log('Expiry Date:', cleanedText); // Log the expiry date
  };

  const handlePayment = async () => {
    // Check if the form is valid
    if (isFormValid) {
      console.log('Payment Conditions Met:', cardNumber, expiryDate);

      // Create an object to store the data
      const bookingData = {
        userEmail: userEmail,
        movieName: params?.movieName,
        selectedDate: params?.selectedDate,
        selectedShowtime: params?.selectedShowtime,
        bookedSeats: params?.bookedSeats?.join(', '),
      };

      // Insert the booking data into the SQLite database
      insertBookingHistory(
        bookingData.userEmail,
        bookingData.movieName,
        bookingData.selectedDate,
        bookingData.selectedShowtime,
        bookingData.bookedSeats
      );


      Alert.alert(
        'Payment Successful',
        `Thank you for your purchase! Total Amount: $${totalAmount}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to HomeScreen
              navigation.navigate('HomeScreen');
            },
          },
        ]
      );
    } else {
      console.log('Payment Conditions Not Met:', cardNumber, expiryDate);
      // Payment failed
      Alert.alert(
        'Payment Failed',
        'Please fill in all payment details correctly.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <TextInput
        style={[styles.input, !isCardValid && styles.invalidInput]} 
        placeholder="Card Number"
        onChangeText={handleCardNumberChange}
        value={cardNumber}
        keyboardType="numeric"
        maxLength={16}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        onChangeText={handleExpiryDateChange}
        value={expiryDate}
        keyboardType="numeric"
        maxLength={5}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        onChangeText={(text) => setCvv(text)}
        value={cvv}
        keyboardType="numeric"
        maxLength={3} // Limit CVV input to 3 digits
      />
      <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
      <Button title="Pay Now" onPress={handlePayment} disabled={!isFormValid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  invalidInput: {
    borderColor: 'red', 
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PaymentScreen;
