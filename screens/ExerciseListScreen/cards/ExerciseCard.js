import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LayoutAnimation, Platform, UIManager, Modal, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import styles from './styles';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function flattenDictionary(dict) {
  let flattened = {};

  for (let key in dict) {
    if (dict.hasOwnProperty(key)) {

      if (typeof dict[key] === 'object' && dict[key] !== null && !Array.isArray(dict[key])) {
        // Recursively flatten the nested dictionary
        Object.assign(flattened, flattenDictionary(dict[key]));
      } else {
        // Assign the value to the flattened dictionary
        flattened[key] = dict[key];
      }
    }
  }

  return flattened;
}

const ExerciseCard = ({ name, sets, reps, isSuperUser, onSave, exerciseId }) => {
  const [editableSets, setEditableSets] = useState(sets);
  const [editableReps, setEditableReps] = useState(reps);
  const [originalSets, setOriginalSets] = useState(sets);
  const [originalReps, setOriginalReps] = useState(reps);
  const [isEditing, setIsEditing] = useState(false);
  const [customFields, setCustomFields] = useState([]); // For handling custom key-value fields
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
    setCustomFields([...customFields, { [newFieldKey]: newFieldValue }]);
    setNewFieldKey('');
    setNewFieldValue('');
    setIsModalVisible(false);
  };

  // Remove a custom field
  const handleRemoveField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields);
  };

  // Save changes (including custom fields)
  const handleSave = () => {
    const dict = { ...(customFields || {})};
    const flattenedDict = flattenDictionary(dict);
    const updatedExercise = { ...flattenedDict, ...{sets: editableSets, reps: editableReps} };
    onSave(name, exerciseId, updatedExercise);
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
            {customFields.map((field, index) => (
              <View key={index} style={styles.customFieldRow}>
                <Text>{field.key}: {field.value}</Text>
                <TouchableOpacity onPress={() => handleRemoveField(index)}>
                  <FontAwesome name="trash" size={20} color="red" />
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
        console.log("customFields",customFields),
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
              {Object.entries(...customFields).map(([key, value], index, arr) => (
                value !== undefined ? `${key}: ${value}${index < arr.length - 1 ? ' | ' : ''}` : ''
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
