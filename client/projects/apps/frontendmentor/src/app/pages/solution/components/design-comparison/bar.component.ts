import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      style="
            background: rgb(255, 255, 255);
            box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
              rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
              rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
            flex: 0 1 auto;
            height: 100%;
            width: 4px;
          "
    ></div>

    <div
      style="
            align-items: center;
            border: 4px solid rgb(255, 255, 255);
            border-radius: 100%;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
              rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
              rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
            box-sizing: border-box;
            display: flex;
            flex: 1 0 auto;
            height: 40px;
            justify-content: center;
            width: 40px;
            transform: none;
          "
    >
      <div
        style="
              border-width: 6px;
              border-style: inset solid inset inset;
              border-color: rgba(0, 0, 0, 0) rgb(255, 255, 255) rgba(0, 0, 0, 0)
                rgba(0, 0, 0, 0);
              border-image: initial;
              height: 0px;
              margin-left: -10px;
              margin-right: 10px;
              width: 0px;
            "
      ></div>
      <div
        style="
              border-width: 6px;
              border-style: inset inset inset solid;
              border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)
                rgb(255, 255, 255);
              border-image: initial;
              height: 0px;
              margin-right: -10px;
              width: 0px;
            "
      ></div>
    </div>

    <!-- Bar Bottom -->
    <div
      style="
            background: rgb(255, 255, 255);
            box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
              rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
              rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
            flex: 0 1 auto;
            height: 100%;
            width: 4px;
          "
    ></div>
    <!-- end Bar Bottom -->
  `,
  styles: [
    `
      :host {
        @apply min-w-[40px] cursor-ew-resize;
        @apply flex flex-col h-full justify-center items-center;
      }
    `,
  ],
})
export class BarComponent {}
