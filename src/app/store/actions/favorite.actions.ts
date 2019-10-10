import { createAction, props } from '@ngrx/store';
import { Favorite } from 'src/app/core/models/favorite.model';
import { ErrorMessage } from 'src/app/core/models/error-message.model';

export enum FavoriteActionsDefinition {
    LoadDashboardFavorite = '[FAVORITE] Load Dashboard Favorites',
    LoadDashboardFavoriteSuccess = '[FAVORITE] Load Dashboard Favorite Success',
    LoadDashboardFavoriteFail = '[FAVORITE] Load Dashboard Favorite Fail',
}

export const LoadDashboardFavorite = createAction(
    FavoriteActionsDefinition.LoadDashboardFavorite
);

export const LoadDashboardFavoriteSuccess = createAction(
    FavoriteActionsDefinition.LoadDashboardFavoriteSuccess,
    props<{ chartFavorite: Favorite }>()
);

export const LoadDashboardFavoriteFail = createAction(
    FavoriteActionsDefinition.LoadDashboardFavoriteFail,
    props<{ error: ErrorMessage }>()
);

