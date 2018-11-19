import * as React from 'react';
import { CameraRoll, GetPhotosReturnType, Platform } from 'react-native';
import { Container, ActionMap } from 'constate';
import { Mount, Update } from 'react-lifecycle-components';

interface State {
  photos?: Partial<GetPhotosReturnType>;
  error: boolean;
}

interface Actions {
  setPhotos: (photos: GetPhotosReturnType) => void;
  setError: (error: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setPhotos: (photos) => () => ({
    photos,
  }),
  setError: (error) => () => ({
    error,
  }),
};

interface Children {
  photos?: Partial<GetPhotosReturnType>;
  shouldLoadMore: () => void;
  error: boolean;
}

interface DataProps {
  children: (args: Children) => React.ReactNode;
  shouldLoad: boolean;
}

import { PermissionsAndroid } from 'react-native';

async function requestCameraPermission() {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'DUMMY',
        message: 'Dummy',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

const loadPhotos = async ({ photos, setPhotos, setError }: Actions & State) => {
  const approved = await requestCameraPermission();

  if (!approved) {
    return setError(true);
  }

  CameraRoll.getPhotos({
    first: 10,
    after: photos!.page_info ? photos!.page_info!.end_cursor : undefined,
    assetType: 'All',
  })
    .then((cameraRoll) => {
      if (photos!.page_info && !photos!.page_info!.has_next_page) {
        return;
      }

      setPhotos({
        ...cameraRoll,
        edges: [...photos!.edges!, ...cameraRoll.edges],
      });
    })
    .catch(() => {
      setError(true);
    });
};

export const Data: React.SFC<DataProps> = ({ children, shouldLoad }) => (
  <Container
    actions={actions}
    initialState={{ photos: { edges: [] }, error: false }}
  >
    {({ photos, setPhotos, setError, error }) => (
      <>
        {shouldLoad && (
          <Mount on={() => loadPhotos({ photos, setPhotos, setError, error })}>
            {null}
          </Mount>
        )}
        {children({
          photos,
          error,
          shouldLoadMore: () => {
            loadPhotos({ photos, setPhotos, setError, error });
          },
        })}
      </>
    )}
  </Container>
);
