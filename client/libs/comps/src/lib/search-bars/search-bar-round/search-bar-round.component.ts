import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unsubscribe } from '@lbk/shared/common';
import { isBs3 } from 'ngx-bootstrap/utils';

@Component({
  selector: 'lbk-search-bar-round',
  templateUrl: './search-bar-round.component.html',
  styleUrls: ['./search-bar-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarRoundComponent extends Unsubscribe implements OnInit {
  isBs3 = isBs3();
  selected?: string;

  @Input('states')
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  @Output('onSubmit')
  onSubmitEmitter = new EventEmitter();

  ngOnInit() {
  }

  // @Input('width')
  // width: string | null = null;
  //
  // @Input('height')
  // height: string = '60px';
  //
  // /**
  //  * - query Change
  //  */
  // @Output('onSubmit')
  // onSubmitEmitter = new EventEmitter();
  //
  // @Input('placeHolder')
  // placeHolder = 'Search';
  //
  // /**
  //  * - Is Display clear button
  //  */
  // isDisplayClearButton = false;
  //
  // searchForm: FormControl = new FormControl('');
  //
  //
  // ngOnInit() {
  //   this.appendSub = this.searchForm
  //     .valueChanges
  //     .pipe(debounceTime(300))
  //     .subscribe(this.searchChange);
  // }
  //
  // /**
  //  * - Search change
  //  * @param value
  //  */
  // searchChange = (value: string): void => {
  //   console.log(value);
  //   // update is display clear button
  //   this.isDisplayClearButton = value !== '';
  // };
  //
  // /**
  //  * @private - Check search form empty
  //  */
  // private isEmpty(): boolean {
  //   return this.searchForm.value === '';
  // }
  //
  // /**
  //  * @private - Reset value search form
  //  */
  // private reset(): void {
  //   this.searchForm.setValue('');
  // }
  //
  // /**
  //  * - On Clear Click
  //  */
  // onClear(): void {
  //   this.reset();
  // }
  //
  // /**
  //  * - On Enter Download
  //  */
  // onSubmit(): void {
  //   this.onSubmitEmitter.emit(this.searchForm.value);
  //   this.reset();
  // }

  onClear(): void {
    this.selected = '';
  }

  onSubmit(): void {
    if (!this.selected) return;
    this.onSubmitEmitter.emit(this.selected);
    // reset selected
    this.selected = '';
  }
}


