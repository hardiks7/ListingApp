import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function joiningDateAfterBirthdateValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const birthdate = formGroup.get('birthdate')?.value;
    const joinedDate = formGroup.get('contactInfo')?.get('joinedDate')?.value;

    if (birthdate && joinedDate) {

     const birthDateObj = new Date(birthdate);
      const joinedDateObj = new Date(joinedDate);
      
      console.log('Birthdate:', birthDateObj);  
      console.log('Joined Date:', joinedDateObj);  

      if (joinedDateObj <= birthDateObj) {
        return { 'joiningDateInvalid': true };
      }
    }
    return null;
  };
}
