export interface BankDetailsForm {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface ContactDetailsForm {
  email: string;
  phoneNumber: string;
  countryCode: string;
}

export type FormErrors = {
  [key: string]: string;
};

export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}