import React from 'react';
import { View } from 'react-native';
import Picker from '@uynguyen505/react-native-wheel-picker'
import sharedStyles from './CustomPickerStyles'; // Common styles for both screens

const PickerItem = Picker.Item;

const CustomPicker = ({ itemList, selectedItemIndex, setSelectedItemIndex }) => {
  return (
    <View>
      <Picker
        style={{ width: 150, height: 180 }}
        selectedTextColor={sharedStyles.pickerItemSelected.color} // For Android
        lineColor="#000000" // Top and bottom line color without gradients
        lineGradientColorFrom="#008000" // Starting gradient color for lines
        lineGradientColorTo="#FF5733" // Ending gradient color for lines
        selectedValue={selectedItemIndex}
        itemStyle={sharedStyles.pickerItem} // Shared style for picker items
        onValueChange={(index) => setSelectedItemIndex(index)} // Update selected value
      >
        {itemList.map((value, index) => (
          <PickerItem
            label={value}
            value={index}
            key={index}
            color={selectedItemIndex === index ? '#2684FF' : '#333333'} // Color change based on selection
          />
        ))}
      </Picker>
    </View>
  );
};

export default CustomPicker;
