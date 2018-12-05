import * as React from 'react';
import { Update, Mount, Unmount } from 'react-lifecycle-components';
import { Container, ActionMap } from 'constate';

interface DelayedProps {
  mountChildren: boolean;
  mountChildrenAfter: number;
  unmountChildrenAfter: number;
}

interface State {
  shouldRenderChildren: boolean;
  timer: number;
}

interface Actions {
  setShouldRenderChildren: (shouldRenderChildren: boolean) => void;
  setTimer: (timer: number) => void;
}

const actions: ActionMap<State, Actions> = {
  setShouldRenderChildren: (shouldRenderChildren) => () => ({
    shouldRenderChildren,
  }),
  setTimer: (timer) => () => ({
    timer,
  }),
};

export const Delayed: React.SFC<DelayedProps> = ({
  mountChildren,
  mountChildrenAfter,
  unmountChildrenAfter,
  children,
}) => (
  <Container
    actions={actions}
    initialState={{
      shouldRenderChildren: mountChildren && mountChildrenAfter === 0,
    }}
  >
    {({ shouldRenderChildren, setShouldRenderChildren, setTimer, timer }) => (
      <Update
        was={() => {
          clearTimeout(timer);

          if (mountChildren) {
            setTimer(
              setTimeout(
                () => setShouldRenderChildren(true),
                mountChildrenAfter,
              ),
            );
          } else {
            setTimer(
              setTimeout(
                () => setShouldRenderChildren(false),
                unmountChildrenAfter,
              ),
            );
          }
        }}
        watched={mountChildren}
      >
        <>
          <Mount
            on={() => {
              clearTimeout(timer);

              if (mountChildren && !shouldRenderChildren) {
                setTimer(
                  setTimeout(
                    () => setShouldRenderChildren(true),
                    mountChildrenAfter,
                  ),
                );
              }
            }}
          >
            {null}
          </Mount>
          <Unmount on={() => clearTimeout(timer)}>{null}</Unmount>
          {shouldRenderChildren ? children : null}
        </>
      </Update>
    )}
  </Container>
);
