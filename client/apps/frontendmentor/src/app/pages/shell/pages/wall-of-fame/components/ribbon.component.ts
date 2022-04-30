import { Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-ribbon',
  template: `
    <div
      class="triangle z-[-1] rotate-45 -translate-y-1/2 translate-x-1/2 absolute w-full h-full"
    ></div>

    <span class="one"> 1st </span>
    <span class="two"> 2nd </span>
    <span class="tree"> 3rd </span>
  `,
  styles: [
    `
      :host {
        .one,
        .two,
        .tree {
          @apply text-right text-xs text-white hidden pr-1 pt-1;
        }
      }

      :host-context(.one) {
        .triangle {
          @apply bg-yellow-500;
        }
        .one {
          @apply block;
        }
      }
      :host-context(.two) {
        .triangle {
          @apply bg-[#8EA6B4];
        }
        .two {
          @apply block;
        }
      }

      :host-context(.tree) {
        .triangle {
          @apply bg-[#9C897C];
        }

        .tree {
          @apply block;
        }
      }
    `,
  ],
})
export class RibbonComponent {
  @Input() index!: number;
}
