import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }
});

export const getSizeStyles = (theme: any, size: 'sm' | 'default' | 'lg') => {
  const t = theme.space;
  // Get the base unit dynamically from the theme
  let baseUnit: number;
  
  switch (size) {
    case 'sm':
      baseUnit = parseFloat(t['4']); // scales natively with density
      break;
    case 'lg':
      baseUnit = parseFloat(t['6']);
      break;
    case 'default':
    default:
      baseUnit = parseFloat(t['5']);
      break;
  }

  // Use proportional math to ensure the thumb always perfectly traverses the track
  // regardless of what the baseUnit resolves to in compact/spacious modes.
  return {
    trackWidth: baseUnit * 2.2,
    trackHeight: baseUnit * 1.2,
    padding: baseUnit * 0.1,
    thumbSize: baseUnit,
    translateX: baseUnit,
  };
};
