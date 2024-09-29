import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    exerciseCard: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    exerciseName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    exerciseInfo: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    noExercisesText: {
      textAlign: 'center',
      color: '#aaa',
      marginTop: 20,
    },
    addExerciseContainer: {
      marginTop: 30,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    input: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 8,
      marginBottom: 15,
    },
    smallInput: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    addButton: {
      backgroundColor: '#1EB1FC',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles;