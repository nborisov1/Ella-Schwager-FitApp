import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    title: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
    },
    button: {
      backgroundColor: '#6a0dad',
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 10,
    },
    loginButton: {
      backgroundColor: '#4a4a4a', // Different color for login
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });
    
  export default styles;