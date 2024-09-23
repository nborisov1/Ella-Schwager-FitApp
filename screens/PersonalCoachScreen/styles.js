import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',  // Match background color with the screen
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',  // Light background for the whole screen
    padding: 20,
  },
  headlineContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,  // Reduced margin to keep headline close to ScrollView
    elevation: 5,
  },
  logo: {
    borderRadius: 10,
    marginBottom: 10,
  },
  headlineText: {
    fontSize: 20,  // Adjusted font size
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  sessionList: {
    paddingBottom: 20,  // Padding at the bottom for scrollable content
    flexGrow: 1,  // Make sure ScrollView takes the rest of the available space    
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#fff',
    textAlign: 'right',
  },
  sessionSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'right',
    marginTop: 5,
  },
  icon: {
    marginLeft: 10,
  },

});

export default styles;
