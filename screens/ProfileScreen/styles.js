import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  userName: {
    fontSize: 22,  // Larger font for the user's name
    fontWeight: 'bold',
    color: '#FF8C00',  // Use the primary theme color (orange)
  },
  userGreeting: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'left',
    marginBottom: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: 'center',
    paddingTop: 0
  },
  dayText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    backgroundColor: '#4f6ef6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  dateTextHighlight: {
    fontSize: 16,
    color: 'white',
  },
  statsCard: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderTextContainer: {
    flexDirection: 'column',  // Text should stack vertically
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  todayWorkoutsContainer: {
    marginTop: 30,  // Added margin-top to create space from the workout summary card
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,  // Increased font size
    fontWeight: '700',  // Made the font bold
    color: '#FF8C00',  // Orange to match theme
    marginBottom: 10,
    textAlign: 'left',  // Align text to the left
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',  // Added divider below the section title
    marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Vertically align items in the center
    paddingHorizontal: 20,  // Horizontal padding for left/right margins
    paddingBottom: 5,  // Reduce space below the profile header to bring components closer
  },
  profileImage: {
    width: 60,  // Profile image size
    height: 60,
    borderRadius: 30,  // Circular profile image
    marginRight: 15,  // Space between image and text
  },
  safeArea: {
    backgroundColor: 'transparent',  // Transparent background for the safe area
    paddingTop: 10,  // Space from the top to avoid overlap with the status bar
  },

});

export default styles;
