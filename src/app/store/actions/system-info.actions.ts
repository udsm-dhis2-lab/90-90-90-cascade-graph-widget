import { createAction, props } from '@ngrx/store';
import { SystemInfo } from 'src/app/core/models/system-info.model';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

export enum SystemInfoActionTypes {
  LoadSystemInfo = '[SystemInfo] Load System info',
  AddSystemInfo = '[SystemInfo] Add System info',
  LoadSystemInfoFail = '[SystemInfo] Load System info fail'
}

export const loadSystemInfo = createAction('[SystemInfo] Load System info');

export const addSystemInfo = createAction(
  '[SystemInfo] Add System info',
  props<{ systemInfo: SystemInfo }>()
);

export const loadSystemInfoFail = createAction(
  '[SystemInfo] Load System info fail',
  props<{ error: ErrorMessage }>()
);
