import { Picker } from 'src/features/profile/components/select-cashback/picker'

export const CASHBACK_PICKER_COMPONENT = {
  name: 'CashbackPicker',
}

export const register = (
  registerComponent: (
    cashbackPickerComponentName: string,
    getCashbackPicker: () => typeof Picker,
  ) => void
) => registerComponent(CASHBACK_PICKER_COMPONENT.name, () => Picker)
