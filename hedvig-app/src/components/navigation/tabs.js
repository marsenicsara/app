import React from "react"
import { Button, Text } from "react-native"
import { TabNavigator } from "react-navigation"
import styled from "styled-components/native"

import { Placeholder } from "../Styles"

class DashboardTab extends React.Component {
  render() {
    return (
      <Placeholder>
        <Text>Dashboard</Text>
        <Button
          title="Launch modal on 2"
          onPress={() =>
            this.props.navigation.navigate("MyModal", {
              initialRouteName: "B"
            })}
        />
      </Placeholder>
    )
  }
}

class AssetTrackerTab extends React.Component {
  render() {
    return (
      <Placeholder>
        <Text>Asset Tracker</Text>
        <Button
          title="Launch modal on 3"
          onPress={() =>
            this.props.navigation.navigate("MyModal", {
              initialRouteName: "C"
            })}
        />
      </Placeholder>
    )
  }
}

const MyTabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

class MyTabs extends React.Component {
  render() {
    // console.log("TAB INDEX", this.props.navigation.state.index)
    return (
      <MyTabsContainer>
        <Button
          title="Dashboard"
          disabled={this.props.navigation.state.index === 0}
          onPress={() => {
            this.props.navigation.navigate("DashboardTab")
          }}
        />
        <Button
          title="Asset Tracker"
          disabled={this.props.navigation.state.index === 1}
          onPress={() => {
            this.props.navigation.navigate("AssetTrackerTab")
          }}
        />
      </MyTabsContainer>
    )
  }
}

const MyTabNavigator = TabNavigator(
  {
    DashboardTab: {
      screen: DashboardTab
    },
    AssetTrackerTab: {
      screen: AssetTrackerTab
    }
  },
  {
    tabBarComponent: MyTabs,
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: "DashboardTab"
  }
)

export { MyTabNavigator, DashboardTab, AssetTrackerTab }
