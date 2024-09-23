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
  pickerItem: {
    fontSize: 28,  // Font size for the picker items
  },
  ageTextSelected: {
    color: '#7D3C98',  // Purple for the selected item
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 50,
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
