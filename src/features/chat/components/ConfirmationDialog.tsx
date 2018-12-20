import * as React from 'react';
import { ModalDialog } from 'src/components/ModalDialog';
import { Delayed } from 'src/components/Delayed';

interface Props {
  title: string;
  paragraph: string;
  confirmButtonTitle: string;
  dismissButtonTitle: string;
  showModal: boolean;
  updateModalVisibility: (visible: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmationDialog: React.SFC<Props> = ({
  title,
  paragraph,
  confirmButtonTitle,
  dismissButtonTitle,
  showModal,
  updateModalVisibility,
  onConfirm,
}) => (
  <Delayed
    mountChildren={showModal}
    mountChildrenAfter={100}
    unmountChildrenAfter={100}
  >
    <ModalDialog
      title={title}
      paragraph={paragraph}
      confirmButtonTitle={confirmButtonTitle}
      dismissButtonTitle={dismissButtonTitle}
      onConfirm={async () => {
        updateModalVisibility(false);
        onConfirm();
      }}
      onDismiss={() => {
        updateModalVisibility(false);
      }}
    />
  </Delayed>
);
