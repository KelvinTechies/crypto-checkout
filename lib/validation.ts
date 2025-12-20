import { BankDetailsForm, ContactDetailsForm, FormErrors } from '../app/components/types';

export const validateBankDetails = (data: BankDetailsForm): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.bank) {
    errors.bank = 'Please select a bank';
  }
  
  if (!data.accountNumber) {
    errors.accountNumber = 'Account number is required';
  } else if (!/^\d{10}$/.test(data.accountNumber)) {
    errors.accountNumber = 'Account number must be 10 digits';
  }

  if (!data.accountName) {
    errors.accountName = 'Account verification required';
  }
  
  return errors;
};

export const validateContactDetails = (data: ContactDetailsForm): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!/^\d{3}\s*-?\s*\d{3}\s*-?\s*\d{5}$/.test(data.phoneNumber.replace(/\s/g, ''))) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }
  
  return errors;
};

export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)} - ${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)} - ${numbers.slice(3, 6)} - ${numbers.slice(6, 11)}`;
};