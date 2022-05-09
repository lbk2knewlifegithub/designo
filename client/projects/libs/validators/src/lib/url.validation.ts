import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * - Validation URL
 * @param control
 */
export const validURL = (control: AbstractControl): ValidationErrors | null => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  const value = control.value as string;
  if (pattern.test(value)) return null;
  else return { url: value };
};
