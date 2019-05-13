import * as React from 'react';
import { Mount, Update } from 'react-lifecycle-components';
import { HeightConstraint } from '../HeightConstraint';
import { scheduleAnimation } from '../ScheduleAnimation';
import { OpenState } from 'src/components/OpenState';

interface MessageHeightAnimationProps {
  visible: boolean;
  useWidth?: boolean;
  notificationMessage?: boolean;
}

export const MessageHeightAnimation: React.SFC<MessageHeightAnimationProps> = ({
  children,
  visible,
  useWidth,
}) => (
  <OpenState initialOpenState={false}>
    {({ isOpen, setIsOpen }) => (
      <>
        <Mount
          on={() => {
            if (!visible) return;
            setTimeout(() => {
              setIsOpen(true);
              scheduleAnimation(600);
            }, 50);
          }}
        >
          {null}
        </Mount>

        <Update
          was={() => {
            setIsOpen(true);
            scheduleAnimation(600);
          }}
          watched={visible}
        >
          {null}
        </Update>
        <HeightConstraint
          visible={visible && isOpen}
          notificationMessage={true}
          useWidth={useWidth}
        >
          {children}
        </HeightConstraint>
      </>
    )}
  </OpenState>
);
