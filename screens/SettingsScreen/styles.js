import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  editProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileInfoText: {
    fontSize: 14,
    color: '#666',
  },
  settingsGroup: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  settingsGroupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingsItemText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
