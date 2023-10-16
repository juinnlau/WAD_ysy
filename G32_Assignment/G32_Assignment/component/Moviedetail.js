import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const Moviedetail = ({ route, navigation }) => {
  // Extract the movie object from the route params
  const { movie, canBook } = route.params;


  const handleBooking = () => {
    if (canBook) {
    const imageURL = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const movieName = movie.title;

    // Pass the movie title and image URL to the next screen
    navigation.navigate('Showtime', { movieName, imageURL });
  } else {
    // Handle case when booking is not allowed (e.g., show a message)
    alert('Booking is not allowed for upcoming movies.');
  }
};

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.movieOverview}>{movie.overview}</Text>
      <Text style={styles.movieReleaseDate}>
        Release Date: {movie.release_date}
      </Text>
      <Text style={styles.movieVoteAverage}>
        Average Vote: {movie.vote_average}
      </Text>

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
        <Text style={styles.bookingButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  movieImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  movieOverview: {
    fontSize: 16,
    marginTop: 10,
  },
  movieReleaseDate: {
    fontSize: 14,
    marginTop: 10,
  },
  movieVoteAverage: {
    fontSize: 14,
    marginTop: 5,
  },
  bookingButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Moviedetail;
