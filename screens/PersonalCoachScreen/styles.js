import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',  // Light background for the entire screen
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',  // Matches the reference design
    paddingHorizontal: 20,  // Padding for the screen's content
  },
  headlineCard: {
    backgroundColor: '#fff',  // White background for the headline card
    borderRadius: 10,  // Rounded corners for the card
    paddingVertical: 15,  // Padding inside the card
    paddingHorizontal: 20,  // Padding inside the card
    marginBottom: 15,  // Spacing below the headline card
    elevation: 5,  // Shadow for card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',  // Centering the headline text
  },
  headlineText: {
    fontSize: 24,  // Large font for the headline
    fontWeight: 'bold',
    color: '#000',  // Black text for visibility
    textAlign: 'left',
  },
  sessionList: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    width: '100%',
    height: width * 0.55,  // Dynamic height for the card
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#fff',  // White background for each card
    elevation: 5,  // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Semi-transparent overlay for readability
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',  // White text
    textAlign: 'left',
  },
  sessionSubtitle: {
    fontSize: 14,
    color: '#fff',  // White subtitle text
    textAlign: 'left',
    marginTop: 5,
  },
  icon: {
    marginLeft: 10,
  },
  loadingText: {
    color: '#000',  // Black text for loading message to match light background
    fontSize: 18,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 20,
    alignSelf: 'center',
    width: width * 0.9,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },

});

export default styles;
