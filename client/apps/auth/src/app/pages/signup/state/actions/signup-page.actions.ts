import { CreateUserDTO } from '@lbk/dto';
import { createAction, props } from '@ngrx/store';

export const signUp = createAction(
  '[SignUp Page] Sign Up',
  props<{
    createUserDTO: CreateUserDTO;
    avatar?: File;
  }>()
);
