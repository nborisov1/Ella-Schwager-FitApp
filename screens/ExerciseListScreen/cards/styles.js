import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    details: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    difficultyContainer: {
      marginVertical: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    slider: {
      width: '100%',
      height: 40,
    },
    difficultyLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    difficultyText: {
      fontSize: 14,
      color: '#555',
    },
    commentToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    commentContainer: {
      marginTop: 10,
    },
    commentBox: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      minHeight: 60,
      textAlignVertical: 'top',
    },
  });
    
  export default styles;
