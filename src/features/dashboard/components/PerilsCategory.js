import React from 'react';
import { View } from 'react-native';
import { Peril } from './Peril';
import {
  StyledCategoryContainer,
  StyledCategoryHeader,
  StyledCategoryIcon,
  StyledCategoryTextContainer,
  StyledExpandButton,
  StyledPerilsContainer,
  StyledPerilsRow,
  StyledCategoryTextAndButton,
  StyledPerilsHelpText,
} from '../styles/dashboard';
import {
  DisabledCollapseButton,
  DisabledExpandButton,
} from '../../../components/Button';
import { StyledRow } from '../../../components/styles/general';
import {
  StyledHeading,
  StyledPassiveText,
  StyledSmallPassiveText,
} from '../../../components/styles/text';

export class PerilsCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategory: false,
    };
  }

  render() {
    let CollapseButton = this.state.showCategory
      ? DisabledCollapseButton
      : DisabledExpandButton;
    const { perils, title } = this.props;
    return (
      <StyledCategoryContainer
        activeOpacity={1}
        onPress={() =>
          this.setState({ showCategory: !this.state.showCategory })
        }
      >
        <StyledCategoryHeader>
          <StyledCategoryIcon source={{ uri: this.props.iconUrl }} />
          <StyledCategoryTextAndButton>
            <StyledCategoryTextContainer>
              <StyledRow>
                <StyledHeading>{this.props.title}</StyledHeading>
              </StyledRow>
              <StyledRow>
                <StyledPassiveText>{this.props.description}</StyledPassiveText>
              </StyledRow>
            </StyledCategoryTextContainer>
            <StyledExpandButton>
              <CollapseButton size="mediumBig" />
            </StyledExpandButton>
          </StyledCategoryTextAndButton>
        </StyledCategoryHeader>
        {this.state.showCategory && (
          <ExpandedPerilsCategory>
            {perils.map((peril) => (
              <Peril
                key={peril.id}
                peril={peril}
                categoryPerils={perils}
                categoryTitle={title}
                perilIndex={perils.findIndex((p) => p.id === peril.id)}
              />
            ))}
          </ExpandedPerilsCategory>
        )}
      </StyledCategoryContainer>
    );
  }
}

export const ExpandedPerilsCategory = (props) => (
  <View>
    <StyledPerilsContainer>
      <StyledPerilsRow>{props.children}</StyledPerilsRow>
    </StyledPerilsContainer>
    <StyledPerilsHelpText>
      <StyledSmallPassiveText>
        Klicka på ikonerna för mer info
      </StyledSmallPassiveText>
    </StyledPerilsHelpText>
  </View>
);
