import * as React from 'react'
import { TouchableWithoutFeedback, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getDebugLayout, openDebugLayout } from 'src/navigation/screens/debug/layout';

interface DebugShortcutProps {
  componentId: string,
  children: React.ReactElement<any>
}

export const DebugShortcut: React.StatelessComponent<DebugShortcutProps> = ({ children, componentId }) => {
  if (__DEV__) {
    return (
      <TouchableWithoutFeedback onLongPress={() => {
        switch (Platform.OS) {
          case 'ios': {
            openDebugLayout()
            return
          }
          case 'android': {
            Navigation.push(componentId, getDebugLayout().root)
          }
          default: return
        }
      }}>
        {children}
      </TouchableWithoutFeedback>
    )
  }
  return children
}
