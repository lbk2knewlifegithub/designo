import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-menu-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="toggleOverlay()" aria-label="menu" [class.shown]="shown">
      <span [style.background]="color" *ngFor="let _ of arrays"> </span>
    </button>
  `,
  styleUrls: ['./menu-one.component.scss'],
})
export class MenuOneComponent implements OnInit {
  @Input() shown!: boolean;
  @Input() color = 'white';

  @Output() shownChange = new EventEmitter<boolean>();

  arrays!: number[];
  ngOnInit(): void {
    this.arrays = Array.from({ length: 6 });
  }

  toggleOverlay() {
    this.shown = !this.shown;
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [MenuOneComponent],
  declarations: [MenuOneComponent],
})
export class MenuOneModule {}
