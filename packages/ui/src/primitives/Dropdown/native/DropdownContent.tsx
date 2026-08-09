import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useDropdownContext } from './DropdownRoot';
import { styles, getDropdownThemeStyles } from './styles';

import { useTheme } from '@prime/theme-provider';
import { Icon } from '../../Icon/Icon.native';

const DropdownContent = ({ children, style }: any) => {
  const { open, setOpen } = useDropdownContext();
  const { theme } = useTheme();

  if (!open) return null;

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <SafeAreaView style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.content, getDropdownThemeStyles(theme).content, style]}>
              {/* Close Button Header (Optional but good for Mobile UX) */}
              {/* <View style={{ alignItems: "flex-end", marginBottom: 4 }}>
                <Pressable
                  onPress={() => setOpen(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Icon
                    name="X"
                    size={20}
                    color={theme.colors.mutedForeground}
                  />
                </Pressable>
              </View> */}

              <View>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export { DropdownContent };
