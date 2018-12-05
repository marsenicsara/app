import * as React from 'react'
import { Platform, KeyboardAvoidingView } from 'react-native'
import { InputHeightContainer } from 'src/features/chat/containers/InputHeight';

export const KeyboardAvoidingOnAndroid: React.SFC<{ additionalPadding: number }> = ({ children, additionalPadding }) => (
  Platform.OS === 'android' ? (
    <InputHeightContainer>
      {({ inputHeight }) => (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={inputHeight + additionalPadding}>
          {children}
        </KeyboardAvoidingView>
      )}
    </InputHeightContainer>
  ) : <>{children}</>
)
