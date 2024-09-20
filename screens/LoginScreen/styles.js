import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Login screen container style
  loginContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  safeArea: {
    backgroundColor: 'transparent',  // Transparent background for the safe area
    paddingBottom: 10,  // Small space from the top to avoid overlap with the status bar
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#e6e6e6',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,  // Reduce space around the image
  },
  loginImage: {
    width: 150,  // Reduced width
    height: 130, // Reduced height
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 24,
    elevation: 10,
    shadowColor: '#000',
  },
  motivationalText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FF8C00',  // Changed to orange
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#555',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 20,
    marginBottom: 16,
    color: '#333',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF8C00',  // Changed to orange
  },
  loginButton: {
    backgroundColor: '#FF8C00',  // Changed to orange
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#555',
  },
  signUpLink: {
    color: '#FF8C00',  // Changed to orange
    fontWeight: 'bold',
  },
});

export default styles;
