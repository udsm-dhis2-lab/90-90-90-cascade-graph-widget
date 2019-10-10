import { createAction, props } from '@ngrx/store';
import { Favorite } from 'src/app/core/models/favorite.model';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

export enum FavoriteActionsDefinition {
    LoadFavorite = '[FAVORITE] Load Favorites',
    LoadFavoriteSuccess = '[FAVORITE] Load Favorite Success',
    LoadFavoriteFail = '[FAVORITE] Load Favorite Fail',
}

export const LoadFavorite = createAction(
    FavoriteActionsDefinition.LoadFavorite
);

export const LoadFavoriteSuccess = createAction(
    FavoriteActionsDefinition.LoadFavoriteSuccess,
    props<{ chartFavorite: Favorite }>()
);

export const LoadFavoriteFail = createAction(
    FavoriteActionsDefinition.LoadFavoriteFail,
    props<{ error: ErrorMessage }>()
);

