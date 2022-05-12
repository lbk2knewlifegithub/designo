import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

export const charactersLeft$ = (
  control: FormControl,
  max: number,
  prefix?: string
): Observable<string> => {
  return control.valueChanges.pipe(
    startWith(''),
    map((content) => {
      let tmp = max - content.length;
      if (tmp < 0) tmp = 0;

      return prefix ? `${prefix} ${tmp}` : `${tmp}`;
    })
  );
};
