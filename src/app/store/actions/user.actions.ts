import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

export enum UserActionTypes {
  LoadCurrentUser = '[User] Load current User',
  AddCurrentUser = '[User] Add Current User',
  LoadCurrentUserFail = '[User] Load Current User fail'
}

export const loadCurrentUser = createAction('[User] Load current User');

export const addCurrentUser = createAction(
  '[User] Add Current User',
  props<{ currentUser: User }>()
);

export const loadCurrentUserFail = createAction(
  '[User] Load Current User fail',
  props<{ error: ErrorMessage }>()
);
