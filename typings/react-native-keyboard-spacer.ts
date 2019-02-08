declare module '@hedviginsurance/react-native-keyboard-spacer' {
  import * as React from 'react';
  import * as ReactNative from 'react-native';

  export interface KeyboardSpacerProps {
    topSpacing?: number;
    onToggle?: (keyboardIsOpen: boolean, keyboardSpace: number) => void;
    style?: ReactNative.StyleProp<ReactNative.ViewStyle>;
    restSpacing?: number;
  }

  export default class KeyboardSpacer extends React.Component<
    KeyboardSpacerProps,
    any
  > {}
}
