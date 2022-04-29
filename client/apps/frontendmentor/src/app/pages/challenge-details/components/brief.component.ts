import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-brief',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-dark font-bold text-2xl">Brief</h2>

    <ul class="grid gap-4 mt-4 text-sm">
      <li>
        Your challenge is to build out this intro section with dropdown
        navigation and get it looking as close to the design as possible.
      </li>

      <li>
        You can use any tools you like to help you complete the challenge. So if
        you've got something you'd like to practice, feel free to give it a go.
      </li>
    </ul>

    <span class="block my-4 text-sm"> Your users should be able to: </span>

    <ul class="grid gap-4 text-sm mt-4 list-inside list-disc">
      <li>
        View the relevant dropdown menus on desktop and mobile when interacting
        with the navigation links
      </li>
      <li>
        View the optimal layout for the content depending on their device's
        screen size
      </li>
      <li>See hover states for all interactive elements on the page</li>
    </ul>

    <ul class="mt-4 grid gap-4 text-sm">
      <li>
        Download the project and go through the
        <span class="bg-primary/20 py-[1px] px-1">README.md</span> file. This
        will provide further details about the project and help you get set up.
      </li>

      <li>
        Want some support on the challenge?
        <a routerLink="/">Join our Slack community</a> and ask questions in the
        help channel.
      </li>
    </ul>
  `,
})
export class BriefComponent {}
