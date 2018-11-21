import * as React from 'react'
import { BackHandler, NativeEventSubscription } from 'react-native';

interface BackButtonProps {
  onPress: () => void
}

export class BackButton extends React.Component<BackButtonProps> {
  backHandler: NativeEventSubscription | undefined;
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.onPress()
      return true
    })
  }

  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove()
    }
  }

  render() {
    return null
  }
}
