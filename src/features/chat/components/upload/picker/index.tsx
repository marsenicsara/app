import * as React from 'react';
import { Consumer } from '../context';
import { FlatList, View, Keyboard } from 'react-native';
import styled from '@sampettersson/primitives';
import { Data } from './data';
import { Image } from './image';
import { Video } from './video';
import { Header } from './header';
import { Delayed } from 'src/components/Delayed';
import { Update } from 'react-lifecycle-components';
import { isIphoneX } from 'react-native-iphone-x-helper';

const getTranslateY = () => (isIphoneX() ? 35 : 0);

const PickerContainer = styled(View)(({ isOpen }: { isOpen: boolean }) => ({
  height: isOpen ? 250 : 0,
  transform: [
    {
      translateY: isOpen ? 0 : getTranslateY(),
    },
  ],
  width: '100%',
}));

interface PickerProps {
  sendMessage: (key: string) => void;
}

interface ListHeaderContextProps {
  sendMessage: (key: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ListHeaderContext = React.createContext<ListHeaderContextProps>({
  sendMessage: () => {},
  setIsOpen: () => {},
});

const ListHeaderComponent = () => (
  <ListHeaderContext.Consumer>
    {({ sendMessage, setIsOpen }) => (
      <Header
        onUpload={(key) => {
          sendMessage(key);
          setIsOpen(false);
        }}
      />
    )}
  </ListHeaderContext.Consumer>
);

export const Picker: React.SFC<PickerProps> = ({ sendMessage }) => (
  <Consumer>
    {({ isOpen, setIsOpen }) => (
      <ListHeaderContext.Provider value={{ setIsOpen, sendMessage }}>
        <PickerContainer isOpen={isOpen}>
          <Update
            watched={isOpen}
            was={() => {
              if (isOpen) {
                Keyboard.dismiss();
              }
            }}
          >
            {null}
          </Update>
          <Delayed
            mountChildren={isOpen}
            unmountChildrenAfter={500}
            mountChildrenAfter={0}
          >
            <Data shouldLoad={isOpen}>
              {({ photos, shouldLoadMore }) => (
                <FlatList
                  ListHeaderComponent={ListHeaderComponent}
                  data={photos!.edges!}
                  renderItem={({ item }) =>
                    item.node.type.includes('Photo') ? (
                      <Image
                        uri={item.node.image.uri}
                        onUpload={(key) => {
                          sendMessage(key);
                          setIsOpen(false);
                        }}
                      />
                    ) : (
                      <Video uri={item.node.image.uri} />
                    )
                  }
                  keyExtractor={(item) => String(item.node.image.uri)}
                  onEndReached={() => shouldLoadMore()}
                  horizontal
                />
              )}
            </Data>
          </Delayed>
        </PickerContainer>
      </ListHeaderContext.Provider>
    )}
  </Consumer>
);
