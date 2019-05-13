import { register as registerDashboard } from './index';
import { register as registerPeril } from './peril';

export const register = (registerComponent) => {
  registerDashboard(registerComponent);
  registerPeril(registerComponent);
};
