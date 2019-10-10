import { createAction, props } from '@ngrx/store';
import { ErrorMessage } from 'src/app/core/models/error-message.model';
import { Extension } from 'src/app/core/models/extension.model';

export enum ExtensionActionsDefinition {
    LoadFavoriteExtension = '[EXTENSIONS] Load Favorites Extension',
    LoadFavoriteExtensionSuccess = '[EXTENSIONS] Load Favorite Extension Success',
    LoadFavoriteExtensionFail = '[EXTENSIONS] Load Favorite Extension Fail',
}

export const LoadFavoriteExtension = createAction(
    ExtensionActionsDefinition.LoadFavoriteExtension
);

export const LoadFavoriteExtensionSuccess = createAction(
    ExtensionActionsDefinition.LoadFavoriteExtensionSuccess,
    props<{ chartExtension: Extension }>()
);

export const LoadFavoriteExtensionFail = createAction(
    ExtensionActionsDefinition.LoadFavoriteExtensionFail,
    props<{ error: ErrorMessage }>()
);
