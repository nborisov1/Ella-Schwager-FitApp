import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: 14,
      color: '#666',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
      },
      list: {
        paddingBottom: 20,
      },
      loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
      },
      safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8',
      },
      searchBox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#ddd',
        borderWidth: 1,
      },
      loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
      },
    
  });
  
export default styles;  