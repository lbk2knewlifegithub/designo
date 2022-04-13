import { Inject, NgModule, Pipe, PipeTransform } from '@angular/core';
import { API_IMAGES_URL, DEFAULT_AVATAR } from '@lbk/tokens';

@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {
  constructor(
    @Inject(DEFAULT_AVATAR)
    private readonly _defaultAvatar: string,
    @Inject(API_IMAGES_URL)
    private readonly _apiImagesUrl: string
  ) {}

  transform(value: { avatar: string | undefined } | undefined): string {
    const { avatar } = value || {};
    return avatar
      ? `${this._apiImagesUrl}/${avatar}.jpeg`
      : this._defaultAvatar;
  }
}

@NgModule({
  exports: [AvatarPipe],
  declarations: [AvatarPipe],
})
export class AvatarPipeModule {}
