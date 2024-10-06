import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LayoutAnimation, Platform, UIManager, Modal, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import styles from './styles';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExerciseCard = ({ name, sets, reps, isSuperUser, onSave, exerciseId, additionalFields }) => {
  const [editableSets, setEditableSets] = useState(sets);
  const [editableReps, setEditableReps] = useState(reps);
  const [originalSets, setOriginalSets] = useState(sets);
  const [originalReps, setOriginalReps] = useState(reps);
  const [isEditing, setIsEditing] = useState(false);
  const [customFields, setCustomFields] = useState(additionalFields ? additionalFields : {}); // For handling custom key-value fields
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [difficulty, setDifficulty] = useState(3);  // Default difficulty (only for non-super user)
  const [comment, setComment] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const toggleCommentSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCommentOpen(!isCommentOpen);
  };
  // Add a custom field
  const handleAddCustomField = () => {
    customFields[newFieldKey] = newFieldValue;
    setNewFieldKey('');
    setNewFieldValue('');
    setIsModalVisible(false);
  };

  // Remove a custom field
  const handleRemoveField = (key) => {
    const updatedFields = { ...customFields };
    delete updatedFields[key];
    setCustomFields(updatedFields);

  };

  // Save changes (including custom fields)
  const handleSave = () => {
    const dict = { ...(customFields || {})};
    let fields = {}
    if (dict !== {}) {
      fields['customField'] = dict;
    }
    if (editableSets != '') {
      fields['sets'] = editableSets;
    }
    if (editableReps != '') {
      fields['reps'] = editableReps;
    }
    onSave(name, exerciseId, fields);
    setOriginalReps(editableReps);
    setOriginalSets(editableSets);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableReps(originalReps);
    setEditableSets(originalSets);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>

      {isSuperUser && isEditing ? (
        <>
          <View style={styles.horizontalContainer}>
            {/* Editable Sets */}
            <View style={styles.editableFieldContainer}>
              <TextInput
                style={styles.input}
                value={String(editableSets)}
                keyboardType="numeric"
                onChangeText={text => setEditableSets(text)}
                placeholder="Sets"
              />
              <Text style={styles.label}>Sets</Text>
            </View>

            {/* Editable Reps */}
            <View style={styles.editableFieldContainer}>
              <TextInput
                style={styles.input}
                value={String(editableReps)}
                keyboardType="numeric"
                onChangeText={text => setEditableReps(text)}
                placeholder="Reps"
              />
              <Text style={styles.label}>Reps</Text>
            </View>
          </View>
          {/* Custom Fields Section */}
          <ScrollView style={styles.customFieldContainer}>
          {customFields && Object.entries(customFields).map(([key, value], index) => (
            <View key={index} style={styles.customFieldRow}>
              {/* Text container for field name and value */}
              <View style={styles.customFieldTextContainer}>
                <Text style={styles.customFieldKey}>{key}:</Text>
                <Text style={styles.customFieldValue}>{value}</Text>
              </View>
              
              {/* Trash icon with a confirmation dialog */}
              <TouchableOpacity
                style={styles.trashButton}
                onPress={() => {
                  // Prompt user to confirm deletion
                  Alert.alert(
                    "Confirm Deletion",
                    `Are you sure you want to delete the field "${key}"?`,
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "OK", onPress: () => handleRemoveField(key) },
                    ],
                    { cancelable: true }
                  );
                }}
              >
                <FontAwesome name="trash" size={18} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

          {/* Add Custom Field Button */}
          <TouchableOpacity
            style={styles.addFieldButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.addFieldButtonText}>+ Add Custom Field</Text>
          </TouchableOpacity>

          {/* Save and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
      <View style={styles.centeredContainer}>
        <Text style={styles.details}>
          {/* Conditionally render Sets and Reps if they are not 0 or undefined */}
          {editableSets > 0 ? `Sets: ${editableSets}` : ''} 
          {editableSets > 0 && editableReps > 0 ? ' | ' : ''} 
          {editableReps > 0 ? `Reps: ${editableReps}` : ''}

          {/* Display custom fields with a '|' separator if they exist */}
          {customFields && Object.keys(customFields).length > 0 && (
            <>
              {(editableSets > 0 || editableReps > 0) && ' | '}
              {Object.entries(customFields).map(([key, value], index, arr) => (
                value !== undefined && (value > 0 || value !== '') ? `${key}: ${value}${index < arr.length - 1 ? ' | ' : ''}` : ''
              ))}
            </>
          )}
        </Text>
      </View>
      )}

      {/* Difficulty Scale for Non-Super Users */}
        <View style={styles.difficultyContainer}>
          <Text style={styles.leftLabel}>Difficulty: {difficulty}</Text>
          {!isSuperUser && (
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={difficulty}
            onValueChange={(value) => setDifficulty(value)}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#C8C8C8"
            thumbTintColor="#4CAF50"
          />
          ) && (
          <View style={styles.difficultyLabels}>
            <Text style={styles.difficultyText}>Easy</Text>
            <Text style={styles.difficultyText}>Hard</Text>
          </View>
          )}
        </View>

      {/* Comment Section */}
      <TouchableOpacity style={styles.commentToggle} onPress={toggleCommentSection}>
        <Text style={styles.leftLabel}>Leave a comment</Text>
        <FontAwesome
          name={isCommentOpen ? 'angle-up' : 'angle-down'}
          size={20}
          color="black"
        />
      </TouchableOpacity>

      {isCommentOpen && (
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentBox}
            placeholder="Add your feedback"
            multiline={true}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>
      )}

      {/* Edit Button for Super Users */}
      {isSuperUser && !isEditing && (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}

      {/* Modal for Adding Custom Fields */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom Field</Text>
            <TextInput
              style={styles.input}
              placeholder="Field Name"
              value={newFieldKey}
              onChangeText={setNewFieldKey}
            />
            <TextInput
              style={styles.input}
              placeholder="Field Value"
              value={newFieldValue}
              onChangeText={setNewFieldValue}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalSaveButton} onPress={handleAddCustomField}>
                <Text style={styles.modalSaveButtonText}>Add Field</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExerciseCard;
