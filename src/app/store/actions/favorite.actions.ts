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

// export enum FavoriteActionsDef {
//     LoadDashboardFavorite = '[FAVORITE] Load Dashboard Favorites',
//     LoadDashboardFavoriteSuccess = '[FAVORITE] Load Dashboard Favorite Success',
//     LoadDashboardFavoriteFail = '[FAVORITE] Load Dashboard Favorite Fail',
// }

// export class LoadDashboardFavorite implements Action {
//     readonly type = FavoriteActionsDef.LoadDashboardFavorite;
//     constructor(public payload: Favorite) { }
// }

// export class LoadDashboardFavoriteSuccess implements Action {
//     readonly type = FavoriteActionsDef.LoadDashboardFavoriteSuccess;
//     constructor(public payload: Favorite) { }
// }

// export class LoadDashboardFavoriteFail implements Action {
//     readonly type = FavoriteActionsDef.LoadDashboardFavoriteFail;
//     constructor(public payload: string) { }
// }

// export type FavoritesActionTypes =
//     | LoadDashboardFavorite
//     | LoadDashboardFavoriteSuccess
//     | LoadDashboardFavoriteFail;
