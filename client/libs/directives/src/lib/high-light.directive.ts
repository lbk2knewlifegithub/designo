import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 *     <input
 [(ngModel)]="searchText"
 type="text"
 class="form-control"
 placeholder="Search Text"
 aria-label="Username"
 aria-describedby="basic-addon1"
 />
 </div>

 <p
 class="text-content"
 // NOTICE HERE
 appHighlight
 highlightColor="blue"
 [highlightText]="searchText"
 >
 */
@Directive({
  selector: '[lbkHighLight]',
})
export class HighLightDirective implements OnChanges {
  @Input() highlightText = '';
  @Input() highlightColor = 'yellow';
  originalHTML = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['highlightText'].firstChange) {
      this.originalHTML = this.el.nativeElement.innerHTML;
      return;
    }
    const { currentValue } = changes['highlightText'];
    if (currentValue) {
      const regExp = new RegExp(`(${currentValue})`, 'gi');
      this.el.nativeElement.innerHTML = this.originalHTML.replace(
        regExp,
        `<span style='background-color: ${this.highlightColor}'>${1}</span>`
      );
    } else {
      this.el.nativeElement.innerHTML = this.originalHTML;
    }
  }
}

@NgModule({
  declarations: [HighLightDirective],
  imports: [CommonModule],
})
export class HighLightModule {}
