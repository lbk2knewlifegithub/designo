import { Bio, UserLinks, User } from '@lbk/models';

export interface UpdateUserDTO
  extends Pick<User, 'name' | 'username' | 'email' | 'location' | 'isHireMe'> {
  bio: Bio;
  links: UserLinks;
}
