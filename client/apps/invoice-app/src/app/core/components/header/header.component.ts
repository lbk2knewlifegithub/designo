import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() openOverlay!: boolean;
  @Input() darkTheme!: boolean;
  @Input() loggedIn!: boolean;

  @Output() toggleTheme = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
}
