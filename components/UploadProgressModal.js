import React from 'react';
import { View, Text, Modal, ActivityIndicator } from 'react-native';
import styles from './uploadProgressModalStyle';

const UploadProgressModal = ({ isVisible, progress, onCancel }) => {
  const handleCancel = () => {
    console.log("CANCEL");
    onCancel();
  }
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Uploading: {progress.toFixed(0)}%</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

export default UploadProgressModal;
