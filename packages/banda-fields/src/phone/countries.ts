/**
 * Données téléphone par pays — groupes de chiffres pour le masque de saisie.
 * Ajustez/complétez librement : la logique de formatage est indépendante des données.
 */

export interface PhoneCountry {
  /** Code ISO 3166-1 alpha-2. */
  readonly iso: string;
  readonly name: string;
  readonly flag: string;
  readonly dialCode: string;
  /** Groupes de chiffres du format national : [2,2,2,2] → 'XX XX XX XX'. */
  readonly groups: readonly number[];
}

export const PHONE_COUNTRIES: readonly PhoneCountry[] = [
  { iso: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241', groups: [2, 2, 2, 2] },
  { iso: 'CM', name: 'Cameroun', flag: '🇨🇲', dialCode: '+237', groups: [3, 2, 2, 2] },
  { iso: 'CG', name: 'Congo', flag: '🇨🇬', dialCode: '+242', groups: [2, 3, 2, 2] },
  { iso: 'CD', name: 'RD Congo', flag: '🇨🇩', dialCode: '+243', groups: [3, 3, 3] },
  { iso: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', dialCode: '+225', groups: [2, 2, 2, 2, 2] },
  { iso: 'SN', name: 'Sénégal', flag: '🇸🇳', dialCode: '+221', groups: [2, 3, 2, 2] },
  { iso: 'BJ', name: 'Bénin', flag: '🇧🇯', dialCode: '+229', groups: [2, 2, 2, 2] },
  { iso: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '+228', groups: [2, 2, 2, 2] },
  { iso: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226', groups: [2, 2, 2, 2] },
  { iso: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223', groups: [2, 2, 2, 2] },
  { iso: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '+227', groups: [2, 2, 2, 2] },
  { iso: 'GN', name: 'Guinée', flag: '🇬🇳', dialCode: '+224', groups: [3, 2, 2, 2] },
  { iso: 'TD', name: 'Tchad', flag: '🇹🇩', dialCode: '+235', groups: [2, 2, 2, 2] },
  { iso: 'GQ', name: 'Guinée équatoriale', flag: '🇬🇶', dialCode: '+240', groups: [3, 3, 3] },
  { iso: 'MA', name: 'Maroc', flag: '🇲🇦', dialCode: '+212', groups: [3, 2, 2, 2] },
];

export const DEFAULT_PHONE_COUNTRY: PhoneCountry = PHONE_COUNTRIES[0] as PhoneCountry;
