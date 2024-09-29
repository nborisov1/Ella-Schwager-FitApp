import { StyleSheet } from 'react-native';

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',  // Center the title
  },
  daysContainer: {
    marginBottom: 15,
    alignItems: 'center',  // Center the days container
  },
  daysTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  daysListContainer: {
    width: '100%',  // Full width to allow horizontal scrolling
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysList: {
    flexDirection: 'row',
    justifyContent: 'center',  // Center the list
    alignItems: 'center',
  },
  dayWrapper: {
    marginHorizontal: 8,  // Add horizontal space between the days
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,  // Rounded edges for a badge-like effect
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  superUserOptions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',  // Spread buttons out
  },
  scrollContainer: {
    paddingBottom: 20,
  },
};
  
  export default styles;