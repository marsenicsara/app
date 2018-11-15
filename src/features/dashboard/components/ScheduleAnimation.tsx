import { LayoutAnimation } from 'react-native';

export const scheduleAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 600,
    create: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
    delete: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
  });
};
