import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  // Match the dark theme
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',  // Match text color to white
  },
  exerciseCard: {
    backgroundColor: '#1c1c1e',  // Dark background for consistency
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',  // White text for readability
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  noExercisesText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
  addExerciseContainer: {
    marginTop: 30,
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#333',  // Dark input background
    color: '#fff',  // White text
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  thumbnailButton: {
    backgroundColor: '#ff0',  // Yellow button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  thumbnailButtonText: {
    color: '#000',  // Black text
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noThumbnailText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  addButton: {
    backgroundColor: '#ff0',  // Yellow button like in ExerciseVideoScreen
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',  // Black text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
