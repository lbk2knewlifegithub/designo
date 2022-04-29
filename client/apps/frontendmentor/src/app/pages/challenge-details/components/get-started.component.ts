import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-get-started',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-dark font-bold text-2xl lg:text-3xl">Getting started</h2>

    <ul
      class="mt-4 grid gap-2 text-sm list-inside list-decimal lg:text-base lg:mt-6"
    >
      <li>Download the starter code</li>

      <li>Set up the project with version control (e.g. Git)</li>

      <li>
        Read the
        <span class="bg-primary/20 py-[1px] px-1">README.md</span> file and have
        a look around the project
      </li>

      <li>
        Get colors, fonts etc from the
        <span class="bg-primary/20 py-[1px] px-1">style-guide.md</span>
        file
      </li>

      <li>Set up your project/file architecture however you want</li>

      <li>Start coding!</li>
    </ul>
  `,
})
export class GetStartedComponent {}
