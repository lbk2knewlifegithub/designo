import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { Image } from '@lbk/models';
import { BreakpointObserverService } from '@lbk/services';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { map, Observable, of } from 'rxjs';

/**
 * Auto change src image base on breakpoin
 * - (min-width: 1440px) => Image Desktop
 * - (min-width: 768px) => Image Tablet
 * - _ => Image Mobile
 */
@Component({
  selector: 'lbk-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [classList]="classImage"
      [alt]="image.alt"
      [defaultImage]="defaultImage"
      [lazyLoad]="(src$ | async)!"
    />
  `,
})
export class ImageComponent implements OnInit {
  @Input() image!: Image;
  @Input() singleImage?: string;
  @Input() classImage = '';

  src$!: Observable<string | undefined>;
  defaultImage = 'https://www.placecage.com/1000/1000';

  constructor(
    private readonly _breakpointObserver: BreakpointObserverService
  ) {}

  ngOnInit(): void {
    if (this.singleImage) {
      this.src$ = of(this.singleImage);
      return;
    }

    this.src$ = this._breakpointObserver.size$.pipe(
      map((size) => {
        switch (size) {
          case '2xl':
            return this.image.desktop;
          case 'xl':
          case 'lg':
          case 'md':
            return this.image.tablet;
          default:
            return this.image.mobile;
        }
      })
    );
  }
}

@NgModule({
  imports: [CommonModule, LazyLoadImageModule],
  exports: [ImageComponent],
  declarations: [ImageComponent],
})
export class ImageModule {}
