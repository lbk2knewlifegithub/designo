import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'lbk-avatar-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <img #image [src]="avatarSrc" alt="Avatar" />
      <!-- Input File -->
      <input
        accept=".jpg, .jpeg, .png"
        [multiple]="false"
        (change)="onFileChange($event)"
        #file
        class="hidden"
        type="file"
      />
      <!-- end Input File -->
    </div>
  `,
})
export class AvatarInputComponent {
  file?: File;
  @Input() avatarSrc!: string;
  @Input() disabled = false;

  @ViewChild('file') fileRef!: ElementRef<HTMLInputElement>;

  constructor(private readonly _cd: ChangeDetectorRef) {}
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

  onAvatarClick() {
    if (this.disabled) return;
    this.fileRef.nativeElement.click();
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [AvatarInputComponent],
  declarations: [AvatarInputComponent],
})
export class AvatarInputModule {}
