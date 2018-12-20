import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styled from '@sampettersson/primitives';

const IconImage = styled(Image)({
  width: 24,
  height: 24,
  alignSelf: 'flex-end',
});

interface Props {
  onPress: () => void;
}

const EditMessageButton: React.SFC<Props> = ({ onPress }) => (
  <TouchableOpacity
    accessibilityComponentType="button"
    accessibilityTraits="button"
    accessibilityLabel="Redigera meddelande"
    onPress={onPress}
    hitSlop={{
      top: 24,
      right: 24,
      bottom: 24,
      left: 24,
    }}
  >
    <IconImage source={require('assets/icons/chat/edit_last_message.png')} />
  </TouchableOpacity>
);

export default EditMessageButton;
