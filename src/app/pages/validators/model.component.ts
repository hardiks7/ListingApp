import { AbstractControl, ValidatorFn } from '@angular/forms';

export function abnValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const abn = control.value?.replace(/\s/g,'');
    
    if (!abn || abn.length !== 11 || isNaN(Number(abn))) {
      return { 'invalidAbn': true };
    }
    
    const abnArray = abn.split('').map(Number);
    abnArray[0] -= 1;

    const weighting = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    
    const weightedSum = abnArray.reduce((sum: number, digit: number, index: number) => sum + digit * weighting[index], 0);
    
    const remainder = weightedSum % 89;
    
    return remainder === 0 ? null : { 'invalidAbn': true };
  };
}
