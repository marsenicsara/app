declare module 'react-native-date-picker' {
  interface DatePickerProps {
    date: Date;
  }

  const DatePicker: React.ComponentType<DatePickerProps>;
  export default DatePicker;
}
