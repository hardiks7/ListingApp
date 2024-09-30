import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    
    // List of allowed domains
    const allowedDomains = ['example.com', 'encodedots.com','mailinator.com','yopmail.com'];
    
    // List of blocked domains
    const blockedDomains = [
      'gmail.com',
      'aol.com',
      'outlook.com',
      'yahoo.com',
      'icloud.com',
      'mozilla.com',
      'mail.com',
      '10minutemail.com'
    ];

    if (email) {
      const domain = email.split('@')[1];
      
      // Check if the domain is allowed
      const isAllowed = allowedDomains.includes(domain);
      // Check if the domain is blocked
      const isBlocked = blockedDomains.includes(domain);
      
      if (isBlocked) {
        return { 'forbiddenEmailDomain': true }; // Invalid email domain
      }
      
      if (!isAllowed) {
        return { 'invalidEmailDomain': true }; // Not an allowed email domain
      }
    }
    
    return null; // Valid email
  };
}
