import * as React from 'react';
import isUrl from 'is-url';

import { Props } from './types';
import { TextMessage } from './text';
import { GiphyMessage } from './giphy';
import { ImageMessage } from './image';

import { isGiphyMessage, isImageMessage } from './utils';
import { FileMessage } from './file';

export const RichMessage: React.SFC<Props> = ({
  message,
  withMargin,
  index,
  fromUser,
}) => {
  if (isUrl(message.body.text.trim())) {
    if (isGiphyMessage(message.body.text)) {
      return (
        <GiphyMessage
          fromUser={fromUser}
          message={message}
          withMargin={withMargin}
          index={index}
        />
      );
    }

    if (isImageMessage(message.body.text)) {
      return (
        <ImageMessage
          fromUser={fromUser}
          message={message}
          withMargin={withMargin}
          index={index}
        />
      );
    }
  }

  if (message.body.key) {
    return (
      <FileMessage
        fromUser={fromUser}
        message={message}
        withMargin={withMargin}
        index={index}
      />
    );
  }

  return (
    <TextMessage
      fromUser={fromUser}
      message={message}
      withMargin={withMargin}
      index={index}
    />
  );
};
