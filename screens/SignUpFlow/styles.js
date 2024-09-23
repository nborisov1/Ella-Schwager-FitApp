import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',  // Dark background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  genderContainer: {
    justifyContent: 'center',
    alignItems: 'center',  // Center the buttons vertically
    marginBottom: 30,
  },
  genderButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,  // Space between buttons
  },
  genderButtonSelected: {
    backgroundColor: '#7D3C98',  // Purple color when selected
  },
  genderText: {
    marginTop: 10,
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderTextSelected: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#555',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  continueButtonActive: {
    backgroundColor: '#7D3C98',  // Purple color when active
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

});

export default styles;
