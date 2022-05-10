import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/**
 * - Validate URL
 * @param control
 */
export const URL = (control: AbstractControl): ValidationErrors | null => {
  const value = (control.value || '') as string;

  // Skip when empty
  const hasRequired = control.hasValidator(Validators.required);
  if (!hasRequired && value.length === 0) return null;

  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  if (pattern.test(value)) return null;
  else return { url: value };
};
