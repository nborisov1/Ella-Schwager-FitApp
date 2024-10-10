import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',  // Dark background similar to AddExerciseScreen
  },
  container: {
    flex: 1,
    backgroundColor: '#000',  // Dark background for the entire screen
    padding: 20,
  },
  headlineContainer: {
    backgroundColor: '#1c1c1e',  // Dark background for headline section
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    elevation: 5,
  },
  headlineText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',  // White text
    textAlign: 'center',
  },
  sessionList: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#1c1c1e',  // Dark background for cards
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay for readability
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',  // White text
    textAlign: 'right',
  },
  sessionSubtitle: {
    fontSize: 16,
    color: '#fff',  // White text for consistency
    textAlign: 'right',
    marginTop: 5,
  },
  icon: {
    marginLeft: 10,
  },
  loadingText: {
    color: '#fff',  // White text for loading message
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;
