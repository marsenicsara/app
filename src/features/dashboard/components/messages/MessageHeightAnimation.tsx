import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, LayoutAnimation } from 'react-native';
import { Mount, Update } from 'react-lifecycle-components';
import { AnimationVisibility } from '../AnimationVisibility';
import { OpenState } from 'src/components/OpenState';

interface MessageHeightAnimationProps {
  visible: boolean;
}

const scheduleAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 600,
    create: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
    delete: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
  });
};

export const MessageHeightAnimation: React.SFC<MessageHeightAnimationProps> = ({
  children,
  visible,
}) => (
  <OpenState initialOpenState={false}>
    {({ isOpen, setIsOpen }) => (
      <>
        <Mount
          on={() => {
            if (!visible) return;
            setTimeout(() => {
              setIsOpen(true);
              scheduleAnimation();
            }, 50);
          }}
        >
          {null}
        </Mount>

        <Update
          was={() => {
            setIsOpen(true);
            scheduleAnimation();
          }}
          watched={visible}
        >
          {null}
        </Update>
        <AnimationVisibility visible={visible && isOpen} useMargin={true}>
          {children}
        </AnimationVisibility>
      </>
    )}
  </OpenState>
);
