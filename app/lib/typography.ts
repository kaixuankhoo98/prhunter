import { Platform, TextStyle } from 'react-native';

const baseText: TextStyle = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System'
  }),
};

const typography = {
  // Headers
  h1: {
    ...baseText,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  } as TextStyle,

  h2: {
    ...baseText,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.3,
  } as TextStyle,

  h3: {
    ...baseText,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
  } as TextStyle,

  // Body text
  body: {
    ...baseText,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,

  bodyLarge: {
    ...baseText,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
  } as TextStyle,

  bodySmall: {
    ...baseText,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,

  // Special variants
  label: {
    ...baseText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  caption: {
    ...baseText,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.2,
  } as TextStyle,

  button: {
    ...baseText,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.3,
  } as TextStyle,

  // Interactive text
  link: {
    ...baseText,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textDecorationLine: 'underline',
  } as TextStyle,

  // Emphasis variants
  bold: {
    fontWeight: '700',
  } as TextStyle,

  semibold: {
    fontWeight: '600',
  } as TextStyle,

  medium: {
    fontWeight: '500',
  } as TextStyle,

  // Alignment helpers
  center: {
    textAlign: 'center',
  } as TextStyle,

  right: {
    textAlign: 'right',
  } as TextStyle,
};

export { typography };
