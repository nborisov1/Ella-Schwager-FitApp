import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,  // Adjusted width (85% of screen width)
    height: 115,  // Adjusted card height
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',  // Center the card horizontally
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Darker overlay for better text contrast
    justifyContent: 'center',  // Center content vertically
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',  // Center content horizontally
  },
  sessionTitle: {
    fontSize: 18,  // Font size to match smaller card
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  sessionSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 3,
  },
  daysContainer: {
    flexDirection: 'row',  // Display days and icons in a row
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayWrapper: {
    alignItems: 'center',  // Center the day text and the icon
    marginHorizontal: 10,  // Add space between each day
  },
  dayText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 5,  // Space between the day text and the icon
  },
  icon: {
    // Styling for the check-circle icon, if needed
  },
});

export default styles;
