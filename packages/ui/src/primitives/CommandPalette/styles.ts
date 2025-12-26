import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dialogContent: {
    maxHeight: '80%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    // Colors and borders handled dynamically in component via theme
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingLeft: 8,
  },
  list: {
    flex: 1,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
  },
});
