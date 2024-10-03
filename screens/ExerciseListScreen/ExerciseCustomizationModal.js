import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import exerciseCustomizationModalStyles from './exerciseCustomizationModalStyles'; // Import new styles

const ExerciseCustomizationModal = ({ visible, onClose, onSave, exerciseName }) => {
  const [customSets, setCustomSets] = useState('');
  const [customReps, setCustomReps] = useState('');
  const [customFields, setCustomFields] = useState([{ name: '', value: '' }]);

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <SafeAreaView style={exerciseCustomizationModalStyles.modalBackground}>
        <View style={exerciseCustomizationModalStyles.modalContainer}>
          <Text style={exerciseCustomizationModalStyles.modalTitle}>Customize {exerciseName}</Text>
          
          {/* Input Fields for Sets and Reps */}
          <ScrollView style={exerciseCustomizationModalStyles.modalContent}>
            <View style={exerciseCustomizationModalStyles.inputRow}>
              <TextInput
                style={exerciseCustomizationModalStyles.inputField}
                placeholder="Sets"
                keyboardType="numeric"
                value={customSets}
                onChangeText={setCustomSets}
              />
              <TextInput
                style={exerciseCustomizationModalStyles.inputField}
                placeholder="Reps"
                keyboardType="numeric"
                value={customReps}
                onChangeText={setCustomReps}
              />
            </View>

            {/* Custom Fields Section */}
            <Text style={exerciseCustomizationModalStyles.sectionTitle}>Add Custom Fields</Text>
            {customFields.map((field, index) => (
              <View key={index} style={exerciseCustomizationModalStyles.customFieldContainer}>
                <TextInput
                  style={exerciseCustomizationModalStyles.customFieldInput}
                  placeholder="Field Name"
                  value={field.name}
                  onChangeText={(value) => handleCustomFieldChange(index, 'name', value)}
                />
                <TextInput
                  style={exerciseCustomizationModalStyles.customFieldInput}
                  placeholder="Field Value"
                  value={field.value}
                  onChangeText={(value) => handleCustomFieldChange(index, 'value', value)}
                />
              </View>
            ))}

            <TouchableOpacity style={exerciseCustomizationModalStyles.addFieldButton} onPress={handleAddCustomField}>
              <FontAwesome name="plus" size={20} color="#fff" />
              <Text style={exerciseCustomizationModalStyles.addFieldButtonText}>Add Field</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Save and Cancel Buttons */}
          <View style={exerciseCustomizationModalStyles.buttonContainer}>
            <TouchableOpacity style={exerciseCustomizationModalStyles.saveButton} onPress={onSave}>
              <Text style={exerciseCustomizationModalStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={exerciseCustomizationModalStyles.cancelButton} onPress={onClose}>
              <Text style={exerciseCustomizationModalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseCustomizationModal;
