import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fadeIn, fadeOut, fadeInLeft, fadeOutLeft } from '@lbk/anims';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'lbk-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    fadeInLeft({ delay: 300 }),
    fadeOutLeft(),
    fadeIn(),
    fadeOut({ delay: 300 }),
  ],
})
export class OverlayComponent implements OnInit, OnDestroy {
  @Input() open!: boolean;
  @Output() closed = new EventEmitter<void>();
  clicks$ = fromEvent(document, 'click');

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.clicks$.subscribe((event) => {
      const target = event.target as HTMLElement;
      const matches = target.matches('.overlay');
      if (matches) {
        this.closed.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
