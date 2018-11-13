import * as React from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getDebugLayout } from 'src/navigation/screens/debug/layout';

interface DebugShortcutProps {
  componentId: string,
  children: React.ReactElement<any>
}

export const DebugShortcut: React.StatelessComponent<DebugShortcutProps> = ({ children, componentId }) => {
  if (__DEV__) {
    return (
      <TouchableWithoutFeedback onLongPress={() => {
        Navigation.push(componentId, getDebugLayout().root)
      }}>
        {children}
      </TouchableWithoutFeedback>
    )
  }
  return children
}
