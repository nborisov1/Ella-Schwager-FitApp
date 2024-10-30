import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowOpacity: 0.1,
    flexDirection: 'column',  // Layout card vertically to place comment at the bottom
  },
  topSection: {
    flexDirection: 'row',  // Horizontal layout for image and details
    alignItems: 'center',  // Align image and details vertically
    width: '100%',
  },
  imageContainer: {
    width: '30%',  // Image occupies 30% of the card width
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,  // Take up the remaining width of the card
    paddingLeft: 15,  // Add spacing between the image and details
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  durationText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'row-reverse',
    marginTop: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  bottomSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 15,
  },
  commentSection: {
    flexDirection: 'row',  // Row layout for input and send button
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 15,  // Space between details and comment section
    width: '100%',  // Full width of the card
    justifyContent: 'space-between',  // Ensure space between the comment box and button
  },
  commentBox: {
    flex: 1,  // Take up the remaining space in the row
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlign: 'right',  // Align text for RTL
  },
  sendButton: {
    marginRight: 10,  // Add some space between the button and the comment box
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },  
  });

export default styles;
