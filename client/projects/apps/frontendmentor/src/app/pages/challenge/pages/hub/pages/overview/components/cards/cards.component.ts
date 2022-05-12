import { DialogService } from '@ngneat/dialog';
import { Challenge } from '@lbk/fm/shared';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  @Input() challenge!: Challenge;

  constructor(private readonly _ds: DialogService) {}

  downloadStarterFiles() {
    const { staterURL, type } = this.challenge;

    if (type != 'free') {
      return this._ds.error('No starter files available');
    }

    const anchor = document.createElement('a');
    anchor.setAttribute('href', staterURL!);
    anchor.setAttribute('download', '');
    anchor.click();
    anchor.remove();
    return;
  }

  downloadFigma() {
    return this._ds.error('No Figma available');
  }

  downloadSketch() {
    return this._ds.error('No Sketch available');
  }
}
