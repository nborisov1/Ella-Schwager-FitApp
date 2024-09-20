import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  workoutCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',  // White card
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  workoutImage: {
    width: 70,  // Workout image on the left
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  workoutType: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',  // Progress bar track background
    marginBottom: 10,
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',  // Orange button
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  playButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '600',
  },
  playIcon: {
    color: 'white',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalTimeContainer: {
    position: 'absolute',
    top: 10,  // Position it at the top
    right: 10,  // Position it at the right
    flexDirection: 'row',  // Align the icon and text horizontally
    backgroundColor: '#FF8C00',  // Suitable background color (Orange)
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,  // This makes the container rounded
    alignItems: 'center',  // Align icon and text vertically
  },
  totalTimeText: {
    color: '#fff',  // White text color for good contrast
    marginLeft: 5,  // Space between the icon and the text
    fontWeight: 'bold',
    fontSize: 12,  // Adjust the font size as needed
  },

});

export default styles;
