import { Inject, NgModule, Pipe, PipeTransform } from '@angular/core';
import { API_URL, DEFAULT_AVATAR } from '@lbk/tokens';

@Pipe({
  name: 'avatar',
})
export class AvatarPipe implements PipeTransform {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string
  ) {}

  transform(
    value: { avatar: string; avatarGithub: string } | undefined
  ): string {
    const { avatar, avatarGithub } = value || {};

    return avatar
      ? `${this._apiUrl}/upload/static/public/${avatar}`
      : avatarGithub!;
  }
}

@NgModule({
  exports: [AvatarPipe],
  declarations: [AvatarPipe],
})
export class AvatarPipeModule {}
