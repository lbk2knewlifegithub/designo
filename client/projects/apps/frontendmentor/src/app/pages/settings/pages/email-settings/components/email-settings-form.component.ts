import { DialogService } from '@ngneat/dialog';
import { Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmailSettings } from '@lbk/models';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-email-notifications-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class=" bg-white border shadow-md rounded-lg p-8 xl:p-8">
      <h1 class="font-bold text-lg sm:text-2xl">EMAIL NOTIFICATIONS</h1>

      <form [formGroup]="form" (ngSubmit)="onSumit()" class="mt-4 sm:mt-10">
        <ul>
          <!-- Comment on Solution -->
          <li>
            <input formControlName="commentOnSolution" type="checkbox" />
            Send me an email when someone comments on my solution.
          </li>
          <!-- end Comment on Solution -->

          <!-- Reply On Comment -->
          <li>
            <input formControlName="replyOnComment" type="checkbox" />
            Send me an email when someone replies to a comment I made.
          </li>
          <!-- end Reply On Comment -->

          <!-- Mention In Comment -->
          <li>
            <input formControlName="mentionInComment" type="checkbox" />
            Send me an email when someone mentions me in a comment.
          </li>
          <!-- end Mention In Comment -->

          <!-- Earn An Archivement -->
          <li>
            <input formControlName="earnAnArchivement" type="checkbox" />
            Send me an email when I earn an achievement.
          </li>
          <!-- end Earn An Archivement -->
        </ul>

        <div class="mt-4 flex justify-end sm:mt-10">
          <lbk-spinner [radius]="30" [loading]="pending">
            <button class="btn btn-error font-bold italic px-10 xm:px-16">
              UPDATE NOTIFICATIONS
            </button>
          </lbk-spinner>
        </div>
      </form>
    </section>
  `,
  styles: [
    `
      ul {
        @apply grid gap-4 text-sm sm:text-base md:gap-6;
        li {
          @apply flex gap-4 items-center;
        }
      }
    `,
  ],
})
export class EmailNotificationsFormComponent implements OnInit {
  form!: FormGroup;
  @Input() emailSettings!: EmailSettings;
  @Input() pending!: boolean;
  @Output() updateEmailSettings = new EventEmitter<EmailSettings>();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _ds: DialogService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }
  private _initForm() {
    const {
      commentOnSolution,
      replyOnComment,
      mentionInComment,
      earnAnArchivement,
    } = this.emailSettings;
    this.form = this._fb.group({
      commentOnSolution: [commentOnSolution],
      replyOnComment: [replyOnComment],
      mentionInComment: [mentionInComment],
      earnAnArchivement: [earnAnArchivement],
    });
  }

  onSumit() {
    if (this.form.value == this.emailSettings) {
      this._ds.error("You haven't changed anything");
      return;
    }

    this.updateEmailSettings.emit(this.form.value);
  }
}
