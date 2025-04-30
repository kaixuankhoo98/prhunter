import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform, Pressable, StyleSheet } from 'react-native';
import { Text } from './ui';
import { typography } from '~/lib/typography';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  useSharedValue
} from 'react-native-reanimated';
import { KeyboardOff } from '~/lib/icons/KeyboardOff';

export function KeyboardDismissButton() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const bottomPosition = useSharedValue(0);

  useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      setKeyboardVisible(true);
      bottomPosition.value = withTiming(e.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      setKeyboardVisible(false);
      bottomPosition.value = withTiming(0);
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -bottomPosition.value }],
    };
  });

  if (!isKeyboardVisible) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => Keyboard.dismiss()}
        className="bg-primary/90 backdrop-blur-sm px-6 py-2.5 rounded-t-xl"
      >
        <KeyboardOff />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
    zIndex: 1000,
  },
}); 