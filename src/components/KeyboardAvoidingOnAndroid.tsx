import * as React from 'react'
import styled from '@sampettersson/primitives'
import { Platform, KeyboardAvoidingView } from 'react-native'

const ExpandingKeyboardAvoidingView = styled(KeyboardAvoidingView)({
  flex: 1
})

export const KeyboardAvoidingOnAndroid: React.SFC<{ additionalPadding: number }> = ({ children, additionalPadding }) => (
  Platform.OS === 'android' ? (
    <ExpandingKeyboardAvoidingView behavior="padding" keyboardVerticalOffset={additionalPadding - 170}>
      {children}
    </ExpandingKeyboardAvoidingView>
  ) : <>{children}</>
)
