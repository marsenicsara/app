import { PickerOverlay } from "src/features/chat/components/upload/picker/header/picker-overlay";


export const FILE_PICKER_COMPONENT = {
  name: 'FilePicker',
}

export const register = (
  registerComponent: (
    filePickerComponentName: string,
    getFilePicker: () => typeof PickerOverlay,
  ) => void
) => registerComponent(FILE_PICKER_COMPONENT.name, () => PickerOverlay)
