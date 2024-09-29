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
  dayWrapper: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
    scrollContainer: {
    paddingBottom: 20,
  },
  exerciseItem: {
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  superUserOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    justifyContent: 'center',
  },
});

export default styles;
