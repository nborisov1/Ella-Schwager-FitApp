import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',  // Light background color
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',  // Darker color for readability
    marginBottom: 20,  // Adds space between the title and button
    textAlign: 'center',  // Center the text
  },
  payButton: {
    backgroundColor: '#FF8C00',  // Orange color to match the app's theme
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#fff',  // White text for contrast
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
