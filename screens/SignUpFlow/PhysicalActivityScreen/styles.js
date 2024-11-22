import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',       // Center the content horizontally
    width: '100%',
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
  levelButton: {
    width: '90%',
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  levelButtonSelected: {
    backgroundColor: '#7D3C98',  // Purple for selected button
  },
  levelText: {
    fontSize: 18,
    color: '#fff',
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
