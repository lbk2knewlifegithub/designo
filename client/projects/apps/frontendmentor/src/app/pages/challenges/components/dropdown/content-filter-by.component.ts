import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { DropdownService } from './dropdown.service';

@Component({
  selector: 'lbk-content-filter-by',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul (clickOutside)="close()" [skip]="['#filter-by']" class="grid bg-white">
      <li *ngFor="let group of groups | objectKeys">
        <!-- Group Name -->
        <h3
          class="block italic pl-3 opacity-50 border-y py-4 text-sm font-bold uppercase"
        >
          {{ group }}
        </h3>
        <!-- end Group Name -->

        <!-- Types List -->
        <ul>
          <li class="w-full" *ngFor="let element of groups[group] | objectKeys">
            <button
              (click)="query(group, element)"
              [class.!uppercase]="group === 'language'"
              class="w-full capitalize flex items-center gap-2 font-medium border-t text-sm py-4 pl-6 cursor-pointer hover:bg-secondary-50"
            >
              <input [checked]="groups[group][element]" type="checkbox" />
              {{ element }}
            </button>
          </li>
        </ul>
        <!-- end Types List -->
      </li>
    </ul>
  `,
})
export class ContentFilterByComponent implements OnInit {
  groups!: {
    [name: string]: {
      [query: string]: boolean;
    };
  };

  constructor(
    private readonly _dropdownService: DropdownService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groups = {
      type: {
        free: false,
        'free+': false,
        premium: false,
      },
      difficulty: {
        newbie: false,
        junior: false,
        intermediate: false,
        advanced: false,
        guru: false,
      },
      language: {
        html: false,
        css: false,
        js: false,
        api: false,
      },
    };

    /**
     * - Inititalize the query params
     */
    this._route.queryParamMap.pipe(take(1)).subscribe((queryParamMap) => {
      for (const group in this.groups) {
        for (const type in this.groups[group]) {
          this.groups[group][type] = queryParamMap.getAll(group).includes(type);
        }
      }
    });
  }

  /**
   * Close
   */
  close() {
    this._dropdownService.close();
  }

  /**
   *  - On Query
   * @param groupName
   * @param queryName
   */
  query(groupName: string, queryName: string) {
    const active = this.groups[groupName][queryName];

    this._route.queryParams
      .pipe(
        map((queryParam) => {
          let array =
            typeof queryParam[groupName] === 'string'
              ? [queryParam[groupName]]
              : ((queryParam[groupName] || []) as string[]);

          if (active) {
            array = array.filter((e) => e !== queryName);
            this.groups[groupName][queryName] = false;
          } else {
            array = [...array, queryName];
            this.groups[groupName][queryName] = true;
          }

          return { ...queryParam, [groupName]: array };
        })
      )
      .pipe(take(1))
      .subscribe((queryParams) => {
        this._router.navigate(['/challenges'], { queryParams });
      });
  }
}
