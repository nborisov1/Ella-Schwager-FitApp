import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  largeCardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  largeCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  labelsRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 5,
  },
  labelText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  workoutDescription: {
    fontSize: 12,
    color: '#888',
  },
  workoutStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statsText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  horizontalList: {
    marginTop: 10,
    paddingBottom: 10,
  },
  smallCardContainer: {
    width: 120,
    marginRight: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  smallThumbnail: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    marginBottom: 8,
  },
  smallCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default styles;
