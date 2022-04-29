import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { Notification } from '../models';

@Pipe({
  name: 'solutionNotifyName',
})
export class SolutionNofifyNamePipe implements PipeTransform {
  @memo()
  transform(notifycation: Notification): string {
    const { type, solution } = notifycation;

    if (!solution) return '';

    switch (type) {
      case 'upvote':
      case 'reply':
        return `your comment on their ${solution.name} solution!`;

      case 'comment':
      case 'bookmark':
      case 'like':
        return `your ${solution.name} solution!`;

      case 'mention':
        return `comment on your ${solution.name} solution!`;

      default:
        return solution.name;
    }
  }
}
