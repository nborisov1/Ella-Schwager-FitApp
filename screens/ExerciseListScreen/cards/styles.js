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
    alignItems: 'center',  // Center the content
    justifyContent: 'center',  // Center the content
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',  // Center the text
    marginBottom: 10,
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',  // Center the text
  },
  horizontalContainer: {
    flexDirection: 'row',  // Arrange items horizontally
    justifyContent: 'space-around',  // Space between sets and reps
    width: '100%',
    marginBottom: 10,
  },
  editableFieldContainer: {
    alignItems: 'center',  // Center the content
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    width: '100%',  // Full width
    marginBottom: 10,  // Add space between input fields
  },
      label: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',  // Center the label
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  difficultyContainer: {
    marginVertical: 20,
    alignSelf: 'stretch',  // Ensure it stretches to full width
    color: 'red'
  },
  leftLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',  // Align label to the left
  },
  slider: {
    width: '100%',
  },
  difficultyLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyText: {
    fontSize: 12,
    color: '#333',
  },
  commentToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'stretch',  // Ensure it stretches to full width
  },
  commentContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'stretch',  // Ensure it stretches to full width
  },
  commentBox: {
    height: 80,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    textAlignVertical: 'top',  // Align text at the top for multiline input
  },
  hintText: {
    fontSize: 12,
    color: '#1E90FF',
    marginTop: 5,
    textAlign: 'center',  // Center the hint text
  },
  editButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',  // Make the edit button take full width
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customFieldContainer: {
    marginTop: 20,
  },
  addFieldButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addFieldButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalSaveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  modalSaveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  modalCancelButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  customFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  customFieldTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customFieldKey: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  customFieldValue: {
    color: '#333',
  },
  trashButton: {
    padding: 8,  // Give the button a little padding for easier clickability
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  noCommentsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  }  
});

export default styles;
