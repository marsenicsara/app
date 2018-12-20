import * as React from 'react';
import { ModalDialog } from 'src/components/ModalDialog';
import { Delayed } from 'src/components/Delayed';

interface Props {
  showModal: boolean;
  updateModalVisibility: (visible: boolean) => void;
  onConfirm: () => void;
}

export const ResetChatModal: React.SFC<Props> = ({
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
      title={'Vill du börja om?'}
      paragraph={'Om du trycker ja så börjar\nkonversationen om från början'}
      confirmButtonTitle={'Ja'}
      dismissButtonTitle={'Nej'}
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
