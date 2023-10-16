import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getBookingHistoryForUser } from '../Database/Historydb';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const BookingHistory = () => {
  const [bookingData, setBookingData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    // Retrieve the user's email from AsyncStorage
    AsyncStorage.getItem('userData')
      .then((data) => {
        if (data) {
          const userData = JSON.parse(data);
          const userEmail = userData.email;
          setUserEmail(userEmail);
          console.log('User Email:', userEmail);

          // Retrieve booking history data for the user using the userEmail
          getBookingHistoryForUser(userEmail, (storedData) => {
            setBookingData(storedData); 
            console.log('Booking history data retrieved successfully:', storedData);
          });
        } else {
          console.log('No user data found in AsyncStorage');
        }
      })
      .catch((error) => {
        console.error('Error retrieving user data from AsyncStorage:', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Booking History</Text>
      {bookingData.map((booking, index) => (
        <View key={index} style={styles.bookingContainer}>
          <Text style={styles.bookingTitle}>Booking {index + 1}</Text>
          <Text style={styles.whiteText}>Movie Name: {booking.movieName}</Text>
          <Text style={styles.whiteText}>Date: {booking.selectedDate}</Text>
          <Text style={styles.whiteText}>Showtime: {booking.selectedShowtime}</Text>
          <Text style={styles.whiteText}>
  Booked Seats: {booking.bookedSeats ? booking.bookedSeats.split('-').join(' - ') : 'No seats booked'}
</Text>

        </View>
      ))}
      {bookingData.length === 0 && (
        <Text style={[styles.noHistoryText, styles.whiteText]}>No booking history available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  bookingContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  whiteText: {
    color: 'black',
  },
  noHistoryText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 20,
  },
});

export default BookingHistory;
