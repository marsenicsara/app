import { PerilsDialog } from "src/features/offer/containers/PerilsDialog";

export const PERIL_COMPONENT = {
  name: 'Peril',
}

export const register = (
  registerComponent: (
    perilComponentName: string,
    getFilePicker: () => typeof PerilsDialog
  ) => void
) => registerComponent(PERIL_COMPONENT.name, () => PerilsDialog)
