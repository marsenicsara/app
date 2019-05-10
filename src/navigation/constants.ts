import { Navigation } from "react-native-navigation";

interface Constants {
  statusBarHeight?: number
}

export let navigationConstants: Constants = {}

export const getNavigationConstants = async (): Promise<void> => new Promise<void>((resolve) => {
  Navigation.constants().then(constants => {
    navigationConstants = constants
    resolve()
  })
})
