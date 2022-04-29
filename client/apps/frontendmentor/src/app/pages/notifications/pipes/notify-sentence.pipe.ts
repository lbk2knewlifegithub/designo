import { Pipe, PipeTransform } from '@angular/core';
import { NotifyType } from '../models';
import memo from 'memo-decorator';

@Pipe({
  name: 'notifySentence',
})
export class NofifySentencePipe implements PipeTransform {
  static NOTIFY_SETENCE = {
    like: 'liked',
    upload: 'just uploaded a solution called',
    mention: 'mentioned you in a',
    bookmark: 'bookmarked',
    upvote: 'upvoted',
    reply: 'replied to',
    comment: 'commented on',
    follow: 'now follows you!',
  };

  @memo()
  transform(type: NotifyType): string {
    return NofifySentencePipe.NOTIFY_SETENCE[type] as string;
  }
}
