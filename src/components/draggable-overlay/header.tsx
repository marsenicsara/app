import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';
import { Arrow } from 'src/components/icons/Arrow';
import { RestartOfferChat } from '../RestartOfferChat';

const HeaderContainer = styled(View)({
  height: 60,
  width: '100%',
  backgroundColor: colors.PURPLE,
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

const Title = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 20,
  color: colors.WHITE,
  fontWeight: '500',
});

const CloseButton = styled(TouchableOpacity)({
  width: 30,
  height: 30,
  backgroundColor: colors.WHITE,
  borderRadius: 15,
  opacity: 0.8,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 2,
});

interface HeaderProps {
  title: string;
  onCloseClick?: () => void;
  restartButton?: boolean;
}

export const Header: React.SFC<HeaderProps> = ({
  title,
  onCloseClick = () => {},
  restartButton,
}) => (
  <HeaderContainer>
    <CloseButton onPress={() => onCloseClick()}>
      <Arrow width={12} height={12} arrowFill={colors.PURPLE} rotate={0} />
    </CloseButton>
    <Title>{title}</Title>
    {restartButton && <RestartOfferChat onCloseClick={() => onCloseClick()} />}
  </HeaderContainer>
);
