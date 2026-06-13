import { fieldSpecs } from '@banda/fields';
import { createSmartField } from './createSmartField';

/**
 * Catalogue des smart fields — chaque champ = 1 ligne, l'intelligence
 * (sanitisation, formatage, Zod) vient de @banda/fields.
 */
export const FirstNameField = createSmartField(fieldSpecs.firstName, 'FirstNameField');
export const LastNameField = createSmartField(fieldSpecs.lastName, 'LastNameField');
export const EmailField = createSmartField(fieldSpecs.email, 'EmailField');
export const CityField = createSmartField(fieldSpecs.city, 'CityField');
export const StreetField = createSmartField(fieldSpecs.street, 'StreetField');
export const HouseNumberField = createSmartField(fieldSpecs.houseNumber, 'HouseNumberField');
export const DateField = createSmartField(fieldSpecs.date, 'DateField');
export const BirthDateField = createSmartField(fieldSpecs.birthDate, 'BirthDateField');
export const AmountField = createSmartField(fieldSpecs.amount, 'AmountField');
export const UrlField = createSmartField(fieldSpecs.url, 'UrlField');
export const OtpField = createSmartField(fieldSpecs.otp, 'OtpField');
export const SearchField = createSmartField(fieldSpecs.search, 'SearchField');
