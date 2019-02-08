import { connect } from 'react-redux';

import { chatActions, dialogActions } from '../../../../hedvig-redux';
import { EditMessageButton } from '../components/Button';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPress: () =>
      dispatch(
        dialogActions.showDialog({
          title: 'Vill du ändra ditt svar?',
          paragraph: 'Tryck ja för att ändra ditt\nsvar på förra frågan',
          confirmButtonTitle: 'Ja',
          dismissButtonTitle: 'Nej',
          onConfirm: () =>
            dispatch(chatActions.editLastResponse(ownProps.index)),
          onDismiss: () => {},
        }),
      ),
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(EditMessageButton);
