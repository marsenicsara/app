import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { colors, fonts } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  listHeader: {
    alignSelf: 'stretch',
    backgroundColor: colors.OFF_WHITE,
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { backgroundColor: colors.OFF_WHITE },
  listElement: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    borderColor: colors.LIGHT_GRAY,
  },
  listElementTexts: { flex: 1, marginRight: 16, marginLeft: 16 },
  listElementHeading: {
    fontFamily: fonts.CIRCULAR,
    color: colors.OFF_BLACK,
    fontSize: 16,
  },
  listElementText: {
    fontFamily: 'CircularStd-Book',
    color: colors.DARK_GRAY,
    fontSize: 14,
  },
  rowButton: { alignSelf: 'flex-end' },
});

export class StyledListHeader extends React.Component {
  render() {
    return <View {...this.props} style={styles.listHeader} />;
  }
}

export class StyledList extends React.Component {
  render() {
    return <ScrollView {...this.props} style={styles.list} />;
  }
}

export class StyledListElement extends React.Component {
  render() {
    return <View {...this.props} style={styles.listElement} />;
  }
}

export class TouchableStyledListElement extends React.Component {
  render() {
    return (
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityTraits="button"
        {...this.props}
        style={styles.listElement}
      />
    );
  }
}

export class StyledListElementTexts extends React.Component {
  render() {
    return <View {...this.props} style={styles.listElementTexts} />;
  }
}

export class StyledListElementHeading extends React.Component {
  render() {
    return <Text {...this.props} style={styles.listElementHeading} />;
  }
}

export class StyledListElementText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.listElementText} />;
  }
}

export class StyledRowButton extends React.Component {
  render() {
    return <View {...this.props} style={styles.rowButton} />;
  }
}
