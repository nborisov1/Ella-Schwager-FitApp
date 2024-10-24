import { StyleSheet, Dimensions, I18nManager } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    width: '100%',
    height: width * 0.4,  // Image height fills the card
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  linearGradient: {
    colors: ['transparent', 'rgba(0, 0, 0, 0.7)', '#1c1c1e'],  // Gradient colors
    start: { x: 0, y: 0 },  // Start gradient at 90% of the card width
    end: { x: 0.8, y: 0 },  // End gradient on the left side
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',  // Center the text vertically
    paddingHorizontal: 15,
  },
  textContainer: {
    flexDirection: 'column',
    paddingBottom: 10,  // Padding to adjust text placement
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',  // White text for session title
    textAlign: 'left',  // Align to the right for RTL
  },
  sessionSubtitle: {
    fontSize: 14,
    color: 'grey',  // White subtitle text
    textAlign: 'left',  // Align to the right for RTL
    marginTop: 5,
    flexWrap: 'wrap',  // Ensure that text wraps to the next line
  },
  daysContainer: {
    position: 'absolute',  // Positioned at the top of the image
    top: 10,
    flexDirection: 'row-reverse',  // Align text RTL for Hebrew
    zIndex: 10,  // Ensure it's above the gradient
    left: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',  // Semi-transparent background for day tags
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  dayText: {
    color: '#fff',  // White text for visibility on dark background
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',  // Right-align text for RTL languages
    writingDirection: 'rtl',  // Ensure right-to-left text direction
  },

  bottomContainer: {
    flexDirection: 'row-reverse',  // Ensures the time and exercises are reversed for RTL
    justifyContent: 'space-between',  // Ensures they are placed at opposite corners
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Dark background for the bottom section
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  detailItem: {
    flexDirection: 'row-reverse',  // Reverse layout for RTL
    alignItems: 'center',
  },
  detailText: {
    color: '#fff',
    marginRight: 5,  // Adjust margin for RTL
    fontSize: 14,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,  // Ensures the ActivityIndicator covers the whole card
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background during loading
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },

});

export default styles;
