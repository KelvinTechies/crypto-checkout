'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { BankDetailsForm, FormErrors } from './types';
import { validateBankDetails } from '@/lib/validation';

const BANKS = [
  'Access Bank',
  'GTBank',
  'First Bank',
  'UBA',
  'Zenith Bank',
  'Ecobank',
  'Fidelity Bank',
  'Union Bank',
  'Sterling Bank',
  'Wema Bank'
];

interface BankDetailsStepProps {
  onNext: (data: BankDetailsForm) => void;
  onBack: () => void;
  initialData?: BankDetailsForm;
}

export default function BankDetailsStep({ onNext, onBack, initialData }: BankDetailsStepProps) {
  const [formData, setFormData] = useState<BankDetailsForm>(
    initialData || {
      bank: '',
      accountNumber: '',
      accountName: 'ODUTUGA GBEKE'
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = (field: string) => {
    setTouched(prev => new Set(prev).add(field));
    const newErrors = validateBankDetails(formData);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const newErrors = validateBankDetails(formData);

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
      setTouched(new Set(['bank', 'accountNumber']));
    }
  };

return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-4">
          Recipient details
        </h1>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Bank
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowBankDropdown(!showBankDropdown)}
              onBlur={() => {
                setTimeout(() => setShowBankDropdown(false), 200);
              }}
              className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-white border ${touched.has('bank') && errors.bank
                ? 'border-red-500'
                : 'border-gray-200'
                } rounded-xl text-left flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base`}
            >
              <span className={formData.bank ? 'text-gray-900' : 'text-gray-400'}>
                {formData.bank || 'Select an option'}
              </span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-2" />
            </button>

            {showBankDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                {BANKS.map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setFormData(prev => ({ ...prev, bank }));
                      setShowBankDropdown(false);

                      if (errors.bank) {
                        const newErrors = { ...errors };
                        delete newErrors.bank;
                        setErrors(newErrors);
                      }
                    }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-gray-50 transition-colors text-gray-900 text-sm sm:text-base"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>
          {touched.has('bank') && errors.bank && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.bank}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Account number
          </label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setFormData({ ...formData, accountNumber: value });
            }}
            onBlur={() => handleBlur('accountNumber')}
            placeholder="Enter your account number"
            className={`w-full px-3 sm:px-4 py-3 sm:py-3.5 border ${touched.has('accountNumber') && errors.accountNumber
              ? 'border-red-500'
              : 'border-gray-200'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors text-sm sm:text-base`}
          />
          {touched.has('accountNumber') && errors.accountNumber && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.accountNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Account name
          </label>
          <div className="w-full px-3 sm:px-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm sm:text-base">
            {formData.accountName}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-800 hover:bg-teal-900 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  </div>
);
}