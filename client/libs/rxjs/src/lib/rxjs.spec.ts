import { concatAll, groupBy, mergeMap, of, timer, toArray, zip } from 'rxjs';

describe('rxjs', () => {
  it('test', () => {
    type Person = {
      name: string;
      age: number;
    };

    const people: Person[] = [
      {
        name: 'John',
        age: 30,
      },
      {
        name: 'Anna',
        age: 30,
      },
      {
        name: 'Lemon',
        age: 20,
      },
    ];

    of(people)
      .pipe(
        concatAll(),
        groupBy((p) => p.age),
        mergeMap((group) => of(group.key))
      )
      .subscribe(console.log);
  });
});
