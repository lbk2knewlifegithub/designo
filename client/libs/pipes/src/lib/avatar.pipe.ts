import { Inject, NgModule, Pipe, PipeTransform } from '@angular/core';
import { API_URL, DEFAULT_AVATAR } from '@lbk/tokens';

@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {
  constructor(
    @Inject(DEFAULT_AVATAR)
    private readonly _defaultAvatar: string,
    @Inject(API_URL)
    private readonly _apiUrl: string
  ) {}

  transform(value: { avatar: string | undefined } | undefined): string {
    const { avatar } = value || {};
    return avatar
      ? `${this._apiUrl}/images/${avatar}.jpeg`
      : this._defaultAvatar;
  }
}

@NgModule({
  exports: [AvatarPipe],
  declarations: [AvatarPipe],
})
export class AvatarPipeModule {}
