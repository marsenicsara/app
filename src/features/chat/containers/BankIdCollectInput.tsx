import React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';

import { UploadingAnimation } from '../../../components/Animation';
import { Message } from '../types';

const Container = styled(View)({
  height: 200,
  alignItems: 'center',
  justifyContent: 'center',
});

interface Props {
  message: Message;
}

const BankIdCollectInput: React.SFC<Props> = ({ message }) => (
  <Container>
    <UploadingAnimation />
  </Container>
);

export default BankIdCollectInput;
