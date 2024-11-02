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
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  labelsRow: {
    flexDirection: 'row-reverse', // Align labels from right to left
    marginVertical: 5,
  },
  labelPrimary: {
    backgroundColor: '#E7A977',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5, // Space between the two labels
  },
  labelSecondary: {
    backgroundColor: '#C96F2C',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  labelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  workoutDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
    textAlign: 'right',
  },
  workoutStats: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
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
});

export default styles;
