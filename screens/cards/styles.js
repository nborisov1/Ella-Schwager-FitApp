import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#F4D03F', // Color of the circle
    borderRadius: 16, // Ensures the circle shape
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
    backgroundColor: 'transparent', // Transparent background for text
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  filterIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  searchIcon: {
    marginLeft: 10,
  },
  workoutList: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row-reverse',  // Align title to the right and button to the left
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#e1b97b',  // Bronze color
    paddingHorizontal: 10,
    textDecorationLine: 'underline',  // Underline the button text
  },
  horizontalList: {
    marginTop: 10,
  },
});

export default styles;
