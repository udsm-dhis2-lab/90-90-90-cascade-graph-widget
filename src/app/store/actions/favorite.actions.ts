import { createAction, props, Action } from '@ngrx/store';
import { ChartFavorite } from 'src/app/core/models/favorite.model';

export enum FavoriteActionTypes {
    LoadDashboardFavorite = '[DASHBOARD FAVORITES] Load Dashboard Favorites',
    LoadDashboardFavoriteSuccess = '[DASHBOARD FAVORITES] Load Dashboard Favorite Success',
    LoadDashboardFavoriteFail = '[DASHBOARD FAVORITES] Load Dashboard Favorite Fail',
    LoadFavoriteAnalytics = '[DASHBOARD FAVORITES ANALYTICS] Load Dashboard Favorites',
    LoadFavoriteAnalyticsSuccess = '[DASHBOARD FAVORITES ANALYTICS] Load Dashboard Favorite Success',
    LoadFavoriteAnalyticsFail = '[DASHBOARD FAVORITES ANALYTICS] Load Dashboard Favorite Fail',
}

export class LoadDashboardFavorite implements Action {
    readonly type = FavoriteActionTypes.LoadDashboardFavorite;
    constructor(public payload: ChartFavorite) { }
}

export class LoadDashboardFavoriteSuccess implements Action {
    readonly type = FavoriteActionTypes.LoadDashboardFavoriteSuccess;
    constructor(public payload: ChartFavorite) { }
}

export class LoadDashboardFavoriteFail implements Action {
    readonly type = FavoriteActionTypes.LoadFavoriteAnalytics;
    constructor(public payload: string) { }
}

export class LoadFavoriteAnalytics implements Action {
    readonly type = FavoriteActionTypes.LoadDashboardFavorite;
    constructor(public payload: ChartFavorite) { }
}

export class LoadFavoriteAnalyticsSuccess implements Action {
    readonly type = FavoriteActionTypes.LoadFavoriteAnalyticsSuccess;
    constructor(public payload: ChartFavorite) { }
}

export class LoadFavoriteAnalyticsFail implements Action {
    readonly type = FavoriteActionTypes.LoadFavoriteAnalyticsFail;
    constructor(public payload: string) { }
}
