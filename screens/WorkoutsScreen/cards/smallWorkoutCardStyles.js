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
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  lockedOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }], // Center the lock icon
    width: 30, // Set width and height to make it a perfect circle
    height: 30,
    borderRadius: 15, // Half of width/height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },  
  });

export default styles;
