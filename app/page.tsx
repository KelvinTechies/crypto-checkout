'use client';

import { useState } from 'react';
import BankDetailsStep from './components/BankDetailsStep';
import ContactDetailsStep from './components/ContactDetailsStep';
import { BankDetailsForm, ContactDetailsForm } from './components/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [bankDetails, setBankDetails] = useState<BankDetailsForm | undefined>();
  const [contactDetails, setContactDetails] = useState<ContactDetailsForm | undefined>();

  const handleBankDetailsComplete = (data: BankDetailsForm) => {
    setBankDetails(data);
    setCurrentStep(2);
  };

  const handleContactDetailsComplete = (data: ContactDetailsForm) => {
    setContactDetails(data);
    console.log('Form completed:', { 
      bankDetails, 
      contactDetails: data 
    });
    
    alert(
      'Form submitted successfully!\n\n' +
      `Bank: ${bankDetails?.bank}\n` +
      `Account: ${bankDetails?.accountNumber}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.countryCode} ${data.phoneNumber}`
    );
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } 
  };

  return (
    <>
      {currentStep === 1 && (
        <BankDetailsStep
          onNext={handleBankDetailsComplete}
          onBack={handleBack}
          initialData={bankDetails}
        />
      )}
      {currentStep === 2 && (
        <ContactDetailsStep
          onNext={handleContactDetailsComplete}
          onBack={handleBack}
          initialData={contactDetails}
        />
      )}
    </>
  );
}