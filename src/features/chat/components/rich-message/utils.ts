import path from 'path';

export const isGiphyMessage = (url: string) => url.includes('giphy.com');
export const isImageMessage = (url: string) =>
  !!['.jpg', '.png', '.gif', '.jpeg'].find((extension) =>
    path.extname(url).includes(extension),
  );
