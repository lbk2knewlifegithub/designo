import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { DEFAULT_AVATAR } from '@lbk/tokens';

@Component({
  selector: 'lbk-avatar-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div (click)="file.click()" class="relative group">
      <img
        #image
        class="w-32 h-32 rounded-full object-cover object-center shadow-lg"
        [src]="avatarSrc"
        alt="Avatar"
      />

      <!-- Choose Avatar -->
      <button
        type="button"
        aria-label="Choose Avatar"
        class="opacity-0 duration-300 absolute inset-0 bg-white/60 group-hover:opacity-100"
      >
        <div class="center">
          <i class="fa-solid fa-image text-3xl"></i>
        </div>
      </button>
      <!-- end Choose Avatar -->

      <!-- Input File -->
      <input
        accept=".jpg, .jpeg, .png, .svg"
        [multiple]="false"
        (change)="onFileChange($event)"
        formControlName="avatar"
        #file
        class="hidden"
        type="file"
      />
      <!-- end Input File -->
    </div>
  `,
})
export class AvatarInputComponent implements OnInit {
  file?: File;

  @Input() avatarSrc!: string;

  constructor(
    private readonly _cd: ChangeDetectorRef,
    @Inject(DEFAULT_AVATAR)
    private readonly _defaultAvatar: string
  ) {}

  ngOnInit(): void {
    if (!this.avatarSrc) {
      this.avatarSrc = this._defaultAvatar;
    }
  }
  /**
   * - On File Change
   */
  onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target || !target.files) return;
    const file = target.files[0];
    // Check if file existed
    if (!file) return;

    this.file = file;

    const reader = new FileReader();

    /**
     * - Convert to base64
     */
    reader.readAsDataURL(file);

    /**
     * - On Load
     */
    reader.onload = (e) => {
      if (!e.target) return;
      const srcBase64 = e.target.result as string;

      this.avatarSrc = srcBase64;
      this._cd.detectChanges();
    };
  };
}

@NgModule({
  imports: [CommonModule],
  exports: [AvatarInputComponent],
  declarations: [AvatarInputComponent],
})
export class AvatarInputModule {}
