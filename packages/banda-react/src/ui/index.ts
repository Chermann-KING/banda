export * from './components/banda/badge';
export * from './components/banda/toast';
export { ThemeProvider } from './theme/ThemeProvider';
export { useTheme } from './theme/useTheme';

/* Formulaires & smart fields */
export { Form, type FormProps } from './forms/Form';
export {
  useForm,
  useFormContext,
  type FormApi,
  type FormErrors,
  type FormValues,
} from './forms/useForm';
export { useSmartField, type SmartFieldState } from './forms/useSmartField';
export { FormField, type FormFieldProps } from './forms/FormField';
export { createSmartField, type SmartFieldProps } from './forms/createSmartField';
export {
  AmountField,
  BirthDateField,
  CityField,
  DateField,
  EmailField,
  FirstNameField,
  HouseNumberField,
  LastNameField,
  OtpField,
  SearchField,
  StreetField,
  UrlField,
} from './forms/fields';
export { PasswordField } from './forms/PasswordField';
export { PhoneField, type PhoneFieldProps } from './forms/PhoneField';

/* Atomes Banda v2 — base HTML native + Tailwind preset partagé */
export * from './components/banda/label';
export * from './components/banda/input';
export * from './components/banda/select';
export * from './components/banda/button';
export * from './components/banda/textarea';
export * from './components/banda/checkbox';
export * from './components/banda/radio';
export * from './components/banda/switch';
export * from './components/banda/form';
export * from './components/banda/table';
export * from './components/banda/stepper';
export * from './components/banda/dropdown-menu';
export * from './components/banda/tabs';
export * from './components/banda/dialog';
export * from './components/banda/card';
