import { Dimensions } from 'react-native';

// Common device sizes from
// https://material.io/devices/
// http://iosres.com/

// Size class: compact
// iPhone 1 to 4        320 x 480
// iPhone 5             320 x 568
// Android One          320 x 569

// Size class: regular
// Common Android       360 x 640
// Galaxy S5 to S7 Edge 360 x 640
// iPhone 6 to 8        375 x 667

// Size class: spacious
// iPhone 6 Plus        414 x 736
// iPhone X             375 x 812
// Google Pixel and XL  411 x 731
// Galaxy S8 and S8+    360 x 740

const HORIZONTAL_SIZE_COMPACT = 320;
const HORIZONTAL_SIZE_REGULAR = 375;
const VERTICAL_SIZE_COMPACT = 639;
const VERTICAL_SIZE_REGULAR = 719;

enum HorizontalSizeClass {
  COMPACT = 'horizontal:compact',
  REGULAR = 'horizontal:regular',
  SPACIOUS = 'horizontal:spacious'
}

enum VerticalSizeClass {
  COMPACT = 'vertical:compact',
  REGULAR = 'vertical:regular',
  SPACIOUS = 'vertical:spacious'
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const getHorizontalSizeClass = (sizeDpx: number) => {
  let sizeClass;
  if (sizeDpx <= HORIZONTAL_SIZE_COMPACT) {
    sizeClass = HorizontalSizeClass.COMPACT;
  } else if (
    sizeDpx > HORIZONTAL_SIZE_COMPACT &&
    sizeDpx <= HORIZONTAL_SIZE_REGULAR
  ) {
    sizeClass = HorizontalSizeClass.REGULAR;
  } else {
    sizeClass = HorizontalSizeClass.SPACIOUS;
  }
  return sizeClass;
};

const getVerticalSizeClass = (sizeDpx: number) => {
  let sizeClass;
  if (sizeDpx <= VERTICAL_SIZE_COMPACT) {
    sizeClass = VerticalSizeClass.COMPACT;
  } else if (
    sizeDpx > VERTICAL_SIZE_COMPACT &&
    sizeDpx <= VERTICAL_SIZE_REGULAR
  ) {
    sizeClass = VerticalSizeClass.REGULAR;
  } else {
    sizeClass = VerticalSizeClass.SPACIOUS;
  }
  return sizeClass;
};

const isPortrait = (viewportWidth: number, viewportHeight: number) => {
  return viewportHeight > viewportWidth;
};

export const getHorizontalSizeClassForDevice = (
  viewportWidth: number,
  viewportHeight: number,
) => {
  return isPortrait(viewportWidth, viewportHeight)
    ? getHorizontalSizeClass(viewportWidth)
    : getVerticalSizeClass(viewportWidth);
};

export const getVerticalSizeClassForDevice = (
  viewportWidth: number,
  viewportHeight: number,
) => {
  return isPortrait(viewportWidth, viewportHeight)
    ? getVerticalSizeClass(viewportHeight)
    : getHorizontalSizeClass(viewportHeight);
};

export const horizontalSizeClass = getHorizontalSizeClassForDevice(
  viewportWidth,
  viewportHeight,
);

export const verticalSizeClass = getVerticalSizeClassForDevice(
  viewportWidth,
  viewportHeight,
);

export { VerticalSizeClass, HorizontalSizeClass }
