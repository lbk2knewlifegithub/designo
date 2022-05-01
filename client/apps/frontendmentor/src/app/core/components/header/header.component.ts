import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeIn, fadeOut } from '@lbk/anims';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  animations: [fadeIn(), fadeOut()],
})
export class HeaderComponent {
  shown = false;

  toggle() {
    this.shown = !this.shown;
  }

  close() {
    this.shown = false;
  }

  open() {
    this.shown = true;
  }
}
