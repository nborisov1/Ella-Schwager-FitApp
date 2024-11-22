import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  workoutPlanCard: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    width: width * 0.9,
    height: 140,
    alignSelf: 'center',
    backgroundColor: '#F5E1C8',
  },
  thumbnailContainer: {
    width: '35%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  heartContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,               // Thin border for subtle effect
    borderColor: 'rgba(255, 255, 255, 0.8)',  // Light border color with transparency
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,           // Light shadow for subtle elevation
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,                 // For Android shadow effect
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-end',      // Align content to the right for RTL
    justifyContent: 'space-between', // Ensure stats are pushed to the bottom
  },
    workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 0, // Ensure there's no bottom margin
    paddingTop:0,
    paddingBottom:0,
    marginTop:0,
    marginBottom:0,
  },
  labelsContainer: {
    position: 'absolute', // Position it on top of the thumbnail
    top: 15,              // Spacing from the top of the card
    zIndex: 2,            // Ensure it's above the image
    alignItems: 'flex-start', // Align items to the left
  },
  labelPrimary: {
    backgroundColor: '#E7A977',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 5,       // Spacing between the labels
  },
  labelSecondary: {
    backgroundColor: '#C96F2C',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  labelText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  workoutDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 0, // Ensure there's no top margin
  },
  workoutStats: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
  },
  statsBlock: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: '#333',
    marginRight: 5,
  },
  daysContainerInline: {
    flexDirection: 'row-reverse',  // Align text RTL for Hebrew
    backgroundColor: 'rgba(255,255,255,1)',  // Semi-transparent background for day tags
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 8,  // Add spacing above to separate from workoutStats
  },
    dayText: {
    color: 'black',  // White text for visibility on dark background
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',  // Right-align text for RTL languages
    writingDirection: 'rtl',  // Ensure right-to-left text direction
  },
  mediumCardContainer: {
    width: (width * 0.9) / 2,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mediumThumbnail: {
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
  },
  mediumCardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  workoutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'right',
  },
  workoutDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    flexDirection: 'row-reverse',
    textAlign: 'right',
  },
  workoutStats: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    },
  statsBlock: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    textAlign: 'right',
  },
  searchInput: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  titleContainer: {
    flexDirection: 'row',  // Align items horizontally
    alignItems: 'center',  // Center vertically
    justifyContent: 'flex-end',  // Push title to the right
    justifyContent: 'space-between',  // Align content at the top and bottom
    width: '100%',
  },
  heartIcon: {
    marginRight: 8, // Add space between the heart icon and the title
  },
  heartIconMediumCard: {
    position: 'absolute',
    top: 10,
    right: 10, // Position the heart icon in the top-right of the thumbnail
    zIndex: 1,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Ensure border radius matches thumbnail
  },  
});

export default styles;
