export const shouldShowDashboard = (insuranceStatus: string) =>
  ['ACTIVE', 'INACTIVE_WITH_START_DATE', 'INACTIVE'].indexOf(
    insuranceStatus,
  ) !== -1;
