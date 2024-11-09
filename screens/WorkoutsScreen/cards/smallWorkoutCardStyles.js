import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  smallCardContainer: {
    width: 120,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',  // Adjust the height to control the gradient overlay size
    justifyContent: 'center', // Center the title vertically in the gradient
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
