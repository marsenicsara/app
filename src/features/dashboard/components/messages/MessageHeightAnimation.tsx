import * as React from 'react';
import { LayoutAnimation } from 'react-native';
import { Mount, Update } from 'react-lifecycle-components';
import { HeightConstraint } from '../HeightConstraint';
import { scheduleAnimation } from '../ScheduleAnimation';
import { OpenState } from 'src/components/OpenState';

interface MessageHeightAnimationProps {
  visible: boolean;
}

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
        <HeightConstraint
          visible={visible && isOpen}
          notificationMessage={true}
        >
          {children}
        </HeightConstraint>
      </>
    )}
  </OpenState>
);
