import { Inject, NgModule, Pipe, PipeTransform } from '@angular/core';
import { API_URL } from '@lbk/tokens';

@Pipe({
  name: 'screenshot',
})
export class ScreenshotPipe implements PipeTransform {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string
  ) {}

  transform(solution: { screenshot: string }): string {
    const { screenshot } = solution || {};

    return `${this._apiUrl}/upload/static/public/${screenshot}`;
  }
}

@NgModule({
  exports: [ScreenshotPipe],
  declarations: [ScreenshotPipe],
})
export class ScreenshotPipeModule {}
