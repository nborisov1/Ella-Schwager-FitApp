import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  daysContainer: {
    justifyContent: 'center',  // Center the days horizontally
    alignItems: 'center',      // Center the days horizontally
    marginVertical: 10,
  },
  daysListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  // Align the entire list of days horizontally
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  superUserOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  customizationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customizationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'column',
    padding: 15,
    marginBottom: 10, // Add some space between exercise items
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
    exerciseName: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',  // Make the edit button take full width
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButtonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginTop: 10,        // Adds some space between the ExerciseCard and the delete button
  },
  superUserOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayWrapper: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  daysList: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  exerciseCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  addButtonContainer: {
    marginLeft: 10,
  },
  addButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  
});
export default styles;
