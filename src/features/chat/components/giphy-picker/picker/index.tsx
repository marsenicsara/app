import * as React from 'react';
import { Consumer } from '../context';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import { Delayed } from 'src/components/Delayed';

import { Data } from './data';
import { SearchBar } from './search-bar';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BackButton } from 'src/components/BackButton';

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
  sendMessage: (message: string) => void;
}

export const Picker: React.SFC<PickerProps> = ({ sendMessage }) => (
  <Consumer>
    {({ isOpen, setIsOpen }) => (
      <PickerContainer isOpen={isOpen}>
        {isOpen && <BackButton onPress={() => setIsOpen(false)} />}
        <Delayed
          mountChildren={isOpen}
          unmountChildrenAfter={500}
          mountChildrenAfter={0}
        >
          <SearchBar>
            {(dataQuery) => (
              <Data
                query={dataQuery}
                onImagePress={(url) => {
                  setIsOpen(false);
                  sendMessage(url);
                }}
              />
            )}
          </SearchBar>
        </Delayed>
      </PickerContainer>
    )}
  </Consumer>
);
