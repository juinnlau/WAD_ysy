import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

// Create tables if they don't exist
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)',
    []
  );
// Modify the table creation code in Historydb.js
tx.executeSql(
    'CREATE TABLE IF NOT EXISTS booking_history (id INTEGER PRIMARY KEY AUTOINCREMENT, userEmail TEXT, movieName TEXT, selectedDate TEXT, selectedShowtime TEXT, bookedSeats TEXT)',
    []
  );
  
});
const deleteUserDataFromHistory = (userEmail) => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM booking_history WHERE userEmail = ?', [userEmail], (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('User data removed from booking history.');
      } else {
        console.log('No user data found in booking history.');
      }
    });
  });
};


const insertBookingHistory = (userEmail, movieName, selectedDate, selectedShowtime, bookedSeats) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO booking_history (userEmail, movieName, selectedDate, selectedShowtime, bookedSeats) VALUES (?, ?, ?, ?, ?)',
        [userEmail, movieName, selectedDate, selectedShowtime, bookedSeats],
        (_, results) => {
          console.log('Booking history inserted successfully');
        },
        (_, error) => {
          console.error('Error inserting booking history:', error);
        }
      );
    });
  };
  
  

// Function to retrieve booking history for a specific user
const getBookingHistoryForUser = (userEmail, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM booking_history WHERE userEmail = ?',
        [userEmail],
        (_, results) => {
          const bookingHistory = results.rows.raw();
          callback(bookingHistory);
        },
        (_, error) => {
          console.error('Error retrieving booking history:', error);
        }
      );
    });
  };
  
export { insertBookingHistory, getBookingHistoryForUser };
