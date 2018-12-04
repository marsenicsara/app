import { INSURANCE_TYPES } from '../constants';
import { ApolloClient } from 'apollo-client';
import { getChatLayout } from 'src/navigation/layouts/chatLayout';
import { Store } from 'src/setupApp';
import { deleteToken } from 'src/graphql/context';
import { setLayout } from 'src/navigation/layouts/setLayout';
import { AsyncStorage } from 'react-native';

export const isApartmentOwner = (insuranceType) => {
  switch (insuranceType) {
    case INSURANCE_TYPES.BRF:
    case INSURANCE_TYPES.SUBLET_BRF:
    case INSURANCE_TYPES.STUDENT_BRF:
      return true;
    default:
      return false;
  }
};

export const isStudentInsurance = (insuranceType) => {
  switch (insuranceType) {
    case INSURANCE_TYPES.STUDENT_BRF:
    case INSURANCE_TYPES.STUDENT_RENT:
      return true;
    default:
      return false;
  }
};

export const resetLoggedInUser = async (
  logout: () => void,
  client: ApolloClient<Object>,
) => {
  await logout();
  deleteToken();
  Store.dispatch({ type: 'DELETE_TOKEN' });
  Store.dispatch({ type: 'DELETE_TRACKING_ID' });
  Store.dispatch({ type: 'AUTHENTICATE' });
  await AsyncStorage.removeItem('@hedvig:alreadySeenMarketingCarousel');
  await setLayout(getChatLayout());
  setTimeout(() => {
    client.resetStore();
  }, 200);
};
