import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',       // Center content horizontally
    width: '100%',
  },
  scrollViewContent: {
    justifyContent: 'center',  // Center the goals list vertically within the screen
    alignItems: 'center',      // Center the items horizontally
    flexGrow: 1,               // Ensure content can grow and still be centered
    width: '100%',             // Ensure the content takes full width for proper centering
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '90%',
  },
  goalItemSelected: {
    borderColor: '#7D3C98',  // Purple border when selected
    borderWidth: 2,
  },
  goalText: {
    color: '#fff',
    fontSize: 18,
    flex: 1,  // Ensures text takes up available space without indentation
    textAlign: 'left',  // Align text to the left side
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#7D3C98',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
