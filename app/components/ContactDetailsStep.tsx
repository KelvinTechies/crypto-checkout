'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { ContactDetailsForm, FormErrors, CountryCode } from './types';
import { validateContactDetails, formatPhoneNumber } from '@/lib/validation';

const COUNTRY_CODES: CountryCode[] = [
  { code: '+234', country: 'NG', flag: '🇳🇬' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' }
];

interface ContactDetailsStepProps {
  onNext: (data: ContactDetailsForm) => void;
  onBack: () => void;
  initialData?: ContactDetailsForm;
}

export default function ContactDetailsStep({ onNext, onBack, initialData }: ContactDetailsStepProps) {
  const [formData, setFormData] = useState<ContactDetailsForm>(
    initialData || {
      email: '',
      phoneNumber: '',
      countryCode: '+234'
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = (field: string) => {
    setTouched(prev => new Set(prev).add(field));
    const newErrors = validateContactDetails(formData);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const newErrors = validateContactDetails(formData);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
      setTouched(new Set(['email', 'phoneNumber']));
    }
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === formData.countryCode) || COUNTRY_CODES[0];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">
            Recipient details
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Recipient email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleBlur('email')}
              placeholder="Enter recipient email"
              className={`w-full px-4 py-3.5 border ${
                touched.has('email') && errors.email
                  ? 'border-red-500'
                  : 'border-gray-200'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors`}
            />
            {touched.has('email') && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

         <div>
  <label className="block text-sm font-medium text-gray-900 mb-2">
    Recipient phone number
  </label>
  <div className="flex gap-1.5 sm:gap-2">
    <div className="relative w-24 sm:w-32 flex-shrink-0">
      <button
        type="button"
        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
        onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
        className="w-full px-2 sm:px-3 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <span className="text-base sm:text-lg">{selectedCountry.flag}</span>
          <span className="text-gray-900 text-xs sm:text-sm">{formData.countryCode}</span>
        </span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
      </button>
      
      {showCountryDropdown && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
          {COUNTRY_CODES.map((country, idx) => (
            <button
              key={`${country.code}-${idx}`}
              type="button"
              onClick={() => {
                setFormData({ ...formData, countryCode: country.code });
                setShowCountryDropdown(false);
              }}
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2"
            >
              <span className="text-base sm:text-lg">{country.flag}</span>
              <span className="text-gray-900 text-xs sm:text-sm">{country.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
    
    <input
      type="tel"
      value={formData.phoneNumber}
      onChange={(e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData({ ...formData, phoneNumber: formatted });
      }}
      onBlur={() => handleBlur('phoneNumber')}
      placeholder="000-000-00000"
      className={`flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-3.5 border ${
        touched.has('phoneNumber') && errors.phoneNumber
          ? 'border-red-500'
          : 'border-gray-200'
      } rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors text-sm sm:text-base`}
    />
  </div>
  {touched.has('phoneNumber') && errors.phoneNumber && (
    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phoneNumber}</p>
  )}
</div>

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-800 hover:bg-teal-900 text-white font-medium py-4 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}