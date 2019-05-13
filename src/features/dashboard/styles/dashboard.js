import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.OFF_WHITE },
  header: {
    paddingTop: 22,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
    backgroundColor: colors.OFF_WHITE,
  },
  categoriesContainer: {
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
  headerItem: { flexDirection: 'row' },
  headerIcon: { marginRight: 5, width: 16, height: 16 },
  categoryContainer: {
    marginBottom: 8,
    flex: 1,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    paddingTop: 16,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    flex: 1,
  },
  categoryIcon: { width: 72, height: 72 },
  categoryTextContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  expandButton: { alignItems: 'flex-end', justifyContent: 'center' },
  categoryTextAndButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  perilsContainer: {
    borderTopColor: colors.OFF_WHITE,
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    flexWrap: 'wrap',
  },
  perilsHelpText: {
    borderTopColor: colors.OFF_WHITE,
    borderTopWidth: 1,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perilsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  conditionRow: { flexDirection: 'row', marginBottom: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export class StyledDashboardContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.container} />;
  }
}

export class StyledDashboardHeaderOffWhite extends React.Component {
  render() {
    return <View {...this.props} style={styles.header} />;
  }
}

export class StyledDashboardHeaderRowLessMargin extends React.Component {
  render() {
    return <View {...this.props} style={styles.headerRow} />;
  }
}

export class StyledDashboardHeaderItem extends React.Component {
  render() {
    return <View {...this.props} style={styles.headerItem} />;
  }
}

export class StyledDashboardHeaderIcon extends React.Component {
  render() {
    return <Image {...this.props} style={styles.headerIcon} />;
  }
}

export class StyledCategoriesContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.categoriesContainer} />;
  }
}

export class StyledCategoryContainer extends React.Component {
  render() {
    return (
      <TouchableOpacity
        accessibilityTraits="header"
        accessibilityComponentType="button"
        {...this.props}
        style={styles.categoryContainer}
      />
    );
  }
}

export class StyledCategoryHeader extends React.Component {
  render() {
    return <View {...this.props} style={styles.categoryHeader} />;
  }
}

export class StyledCategoryIcon extends React.Component {
  render() {
    return <Image {...this.props} style={styles.categoryIcon} />;
  }
}

export class StyledCategoryTextContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.categoryTextContainer} />;
  }
}

export class StyledExpandButton extends React.Component {
  render() {
    return <View {...this.props} style={styles.expandButton} />;
  }
}

export class StyledCategoryTextAndButton extends React.Component {
  render() {
    return <View {...this.props} style={styles.categoryTextAndButton} />;
  }
}

export class StyledPerilsContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.perilsContainer} />;
  }
}

export class StyledPerilsHelpText extends React.Component {
  render() {
    return <View {...this.props} style={styles.perilsHelpText} />;
  }
}

export class StyledPerilsRow extends React.Component {
  render() {
    return <View {...this.props} style={styles.perilsRow} />;
  }
}

export class StyledConditionRow extends React.Component {
  render() {
    return <View {...this.props} style={styles.conditionRow} />;
  }
}
